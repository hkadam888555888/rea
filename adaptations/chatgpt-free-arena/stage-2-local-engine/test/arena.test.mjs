import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProfiles, weightedTotal, chooseWinner, mapLimit, makeInitialPlan } from '../src/arena.mjs';

test('buildProfiles creates up to 100 unique strategy-focus combinations', () => {
  const profiles = buildProfiles(100);
  assert.equal(profiles.length, 100);
  assert.equal(new Set(profiles.map((p) => `${p.strategyId}:${p.focusId}`)).size, 100);
  assert.equal(profiles[0].workerId, 'worker-001');
  assert.equal(profiles[99].workerId, 'worker-100');
});

test('buildProfiles rejects invalid counts', () => {
  assert.throws(() => buildProfiles(1), /2 through 100/);
  assert.throws(() => buildProfiles(101), /2 through 100/);
});

test('weighted score uses the documented weights and reaches 100', () => {
  assert.equal(weightedTotal({ correctness: 10, completeness: 10, robustness: 10, usability: 10, clarity: 10 }), 100);
  assert.equal(weightedTotal({ correctness: 0, completeness: 0, robustness: 0, usability: 0, clarity: 0 }), 0);
  assert.equal(weightedTotal({ correctness: 10, completeness: 0, robustness: 0, usability: 0, clarity: 0 }), 30);
  assert.throws(() => weightedTotal({ correctness: 11, completeness: 10, robustness: 10, usability: 10, clarity: 10 }), /integer from 0 through 10/);
});

test('verified fatal flaw overrides a higher numeric score', () => {
  const result = chooseWinner({
    scoresA: { correctness: 10, completeness: 10, robustness: 10, usability: 10, clarity: 10 },
    scoresB: { correctness: 5, completeness: 5, robustness: 5, usability: 5, clarity: 5 },
    fatalA: true,
    fatalB: false,
  });
  assert.equal(result.winner, 'B');
  assert.equal(result.totalA, 100);
  assert.equal(result.totalB, 50);
});

test('non-fatal solutions compare by locally computed weighted score', () => {
  const result = chooseWinner({
    scoresA: { correctness: 8, completeness: 7, robustness: 7, usability: 8, clarity: 8 },
    scoresB: { correctness: 7, completeness: 7, robustness: 7, usability: 7, clarity: 7 },
    fatalA: false,
    fatalB: false,
  });
  assert.equal(result.winner, 'A');
  assert.equal(result.totalA, 75.5);
  assert.equal(result.totalB, 70);
});

test('initial bracket assigns the right number of byes to reach a power of two', () => {
  const profiles = buildProfiles(100).map((profile) => ({ workerId: profile.workerId, profile, draft: `draft ${profile.workerId}` }));
  const plan = makeInitialPlan(profiles, 1234);
  assert.equal(plan.byes.length, 28);
  assert.equal(plan.matches.length, 36);
  assert.equal(plan.byes.length + plan.matches.length * 2, 100);
  assert.equal(plan.byes.length + plan.matches.length, 64);
  assert.equal(new Set([...plan.byes, ...plan.matches.flatMap((m) => [m.a, m.b])].map((x) => x.workerId)).size, 100);
  assert.deepEqual(makeInitialPlan(profiles, 1234).byes.map((p) => p.workerId), plan.byes.map((p) => p.workerId));
});

test('mapLimit respects the concurrency limit and preserves result order', async () => {
  let active = 0;
  let maximum = 0;
  const output = await mapLimit([5, 4, 3, 2, 1], 2, async (number) => {
    active += 1;
    maximum = Math.max(maximum, active);
    await new Promise((resolve) => setTimeout(resolve, 5));
    active -= 1;
    return number * 2;
  });
  assert.deepEqual(output, [10, 8, 6, 4, 2]);
  assert.equal(maximum, 2);
});

test('local Ollama mock runs a complete two-worker tournament and persists audit records', async () => {
  const http = await import('node:http');
  const fs = await import('node:fs/promises');
  const os = await import('node:os');
  const path = await import('node:path');
  const { runArena } = await import('../src/arena.mjs');
  let requestCount = 0;
  const server = http.createServer(async (request, response) => {
    let raw = '';
    for await (const chunk of request) raw += chunk;
    requestCount += 1;
    const body = JSON.parse(raw);
    const prompt = body.messages?.[0]?.content ?? '';
    let content = 'Mock worker response.\n\n## FINAL REVISED ANSWER\nA validated sample answer.';
    if (prompt.includes('You are the tournament judge.')) {
      content = JSON.stringify({
        scores: {
          A: { correctness: 8, completeness: 8, robustness: 8, usability: 8, clarity: 8 },
          B: { correctness: 7, completeness: 7, robustness: 7, usability: 7, clarity: 7 },
        },
        fatalFlaws: { A: false, B: false },
        fatalEvidence: { A: '', B: '' },
        decisiveReason: 'Candidate A has stronger mock scores.',
        unresolvedRisksA: ['Mock test did not verify real-world correctness.'],
        unresolvedRisksB: ['Mock test did not verify real-world correctness.'],
      });
    }
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ model: body.model, message: { role: 'assistant', content }, done: true, total_duration: 1 }));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'local-arena-test-'));
  try {
    const result = await runArena({ task: 'Return a sample validated solution.', workers: 2, concurrency: 1, model: 'test-model', baseUrl: `http://127.0.0.1:${address.port}`, timeoutMs: 5000, numPredict: 200, seed: 42, outputDir: directory });
    assert.equal(result.manifest.status, 'completed');
    assert.equal(result.manifest.completedWorkers, 2);
    assert.equal(result.roundSummaries.length, 1);
    assert.equal(result.roundSummaries[0].matches, 1);
    assert.equal(requestCount, 7, 'two drafts plus two attacks, two revisions, and one judge');
    const report = await fs.readFile(path.join(result.runDir, 'final-report.md'), 'utf8');
    assert.match(report, /Local Arena — final report/);
    const match = JSON.parse(await fs.readFile(path.join(result.runDir, 'rounds', 'round-01', 'match-001.json'), 'utf8'));
    assert.equal(match.status, 'complete');
    assert.ok(match.attackA && match.attackB && match.revisionA && match.revisionB && match.judgment);
    assert.equal(match.scoring.totalA, 80);
    assert.equal(match.scoring.totalB, 70);
  } finally {
    server.close();
    await fs.rm(directory, { recursive: true, force: true });
  }
});
