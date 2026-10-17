# Stage 2 architecture

## Request flow

```text
Task brief
  └─ lock task + write manifest
      └─ worker generation (one fresh local model call per worker)
          └─ save workers/worker-NNN.json
              └─ single-elimination bracket
                  ├─ attacker A: review B's draft
                  ├─ attacker B: review A's draft
                  ├─ defender A: reply to B's attack and revise A
                  ├─ defender B: reply to A's attack and revise B
                  └─ judge: score both revisions with a structured schema
                      └─ runtime validates score shape, computes weighted totals,
                         applies fatal-flaw rule, saves winner and advances round
                          └─ final-result.json + final-report.md
```

## Worker identity and context isolation

Each worker has a stable ID, an approach profile, and an optimization focus. The 20 approaches combine with five focuses to make 100 distinct instruction profiles. Each initial draft is a new `/api/chat` request with one user message; the service receives no prior worker transcript from this engine. Later attack and revision calls intentionally receive the specific opponent text needed for that match.

The same local Ollama model typically handles all calls. Therefore, “independent” refers to isolated job inputs, outputs, and context boundaries—not separate trained models or statistically independent intelligence. Similar model biases can persist.

## Tournament rules

- Initial worker drafts form the bracket entrants.
- If the worker count is not a power of two, a seeded shuffle selects first-layer byes to reduce the field to the next lower power of two. The seed and complete round plan are saved.
- Each match has two separate attacks and two separate response/revision calls. The judge then emits structured criterion scores, fatal flags with explanations, and unresolved risks.
- The runtime validates scores are integers 0–10 and computes `(30C + 25M + 20R + 15U + 10L) / 10`.
- If exactly one candidate is marked with an evidence-supported fatal flaw, the other candidate advances regardless of totals. An unsupported fatal assertion is downgraded to an unverified risk. Otherwise, totals and explicit tie-break rules choose the winner.
- The winner carries its revised draft into the next round. Match records preserve both candidates' reviews and revised outputs.

## Reliability model

- Each worker file is written atomically after its draft returns.
- Each match record is written after every successful attack/revision phase, then after scoring. If the next phase fails, the previous phases remain saved.
- On resume, saved successful worker outputs and finished match phases are reused. An existing match file must match its stored candidate IDs or the engine refuses to overwrite it.
- Ollama requests retry up to three times with a short backoff. A run that still fails marks the manifest as `interrupted` and keeps outputs for a retry.
- The default concurrency is one. Higher concurrency is configurable up to eight, but must be measured against available memory; more workers does not automatically mean more throughput.

## Trust boundaries

The engine does not execute generated code, invoke tools from the model, browse to URLs supplied by the task, or use worker outputs as system instructions. The only external capability it uses at runtime is the configured Ollama chat endpoint. If that endpoint is changed from loopback to a remote address, task material leaves the local machine.
