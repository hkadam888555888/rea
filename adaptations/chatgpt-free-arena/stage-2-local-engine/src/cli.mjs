#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { runArena } from './arena.mjs';

function help() {
  return `REA Local Arena — Stage 2\n\nUsage:\n  node src/cli.mjs run --task "Your task" [options]\n  node src/cli.mjs run --task-file ./task.md [options]\n  node src/cli.mjs resume --resume ./arena-runs/<run-dir> [options]\n\nOptions:\n  --workers N          Independent initial worker executions (2..100; default 8)\n  --concurrency N      Simultaneous Ollama requests (1..8; default 1)\n  --model NAME         Local Ollama model (default qwen2.5:3b)\n  --ollama-url URL     Ollama base URL (default http://127.0.0.1:11434)\n  --output-dir PATH    Where new run folders are created (default arena-runs)\n  --resume PATH        Resume an existing run folder using its saved task/config\n  --seed N             Reproducible initial bye selection (unsigned 32-bit integer)\n  --timeout-ms N       Timeout for an individual model request (default 600000)\n  --confirm-large-run  Required for new runs above 16 workers\n  --help               Show this message\n\nA full match makes 5 model calls (two attacks, two revisions, one judge).\n100 initial workers therefore can lead to hundreds of additional local calls.\nStart with 4 workers and concurrency 1 before trying a large run.\n`;
}

function parseArgs(argv) {
  const positional = [];
  const options = {};
  const flagNames = new Set(['--confirm-large-run', '--help']);
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) { positional.push(arg); continue; }
    if (flagNames.has(arg)) { options[arg] = true; continue; }
    const value = argv[i + 1];
    if (value === undefined || value.startsWith('--')) throw new Error(`Missing value for ${arg}`);
    options[arg] = value;
    i += 1;
  }
  return { positional, options };
}

function intOption(options, key, fallback) {
  const value = options[key];
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(String(value))) throw new Error(`${key} must be an integer`);
  return Number(value);
}

const { positional, options } = parseArgs(process.argv.slice(2));
if (options['--help'] || positional.length === 0 || positional[0] === 'help') {
  console.log(help());
  process.exit(0);
}
const command = positional[0];
let task = options['--task'] ?? '';
const resumeDir = options['--resume'] ?? null;
if (options['--task-file']) task = await fs.readFile(path.resolve(options['--task-file']), 'utf8');
if (command === 'resume' && !resumeDir) throw new Error('resume command requires --resume PATH');
if (!['run', 'resume'].includes(command)) throw new Error(`Unknown command: ${command}\n\n${help()}`);
if (command === 'run' && !resumeDir && !task.trim()) throw new Error('Provide --task "..." or --task-file PATH');

let savedManifest = null;
if (resumeDir) {
  try { savedManifest = JSON.parse(await fs.readFile(path.join(path.resolve(resumeDir), 'manifest.json'), 'utf8')); }
  catch (error) { throw new Error(`Cannot read the resume manifest: ${error.message}`); }
  if (!task.trim()) task = savedManifest.task;
}

try {
  const result = await runArena({
    task,
    workers: intOption(options, '--workers', savedManifest?.config?.workers ?? 8),
    concurrency: intOption(options, '--concurrency', savedManifest?.config?.concurrency ?? 1),
    model: options['--model'] ?? savedManifest?.config?.model ?? 'qwen2.5:3b',
    baseUrl: options['--ollama-url'] ?? savedManifest?.config?.baseUrl ?? process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434',
    timeoutMs: intOption(options, '--timeout-ms', savedManifest?.config?.timeoutMs ?? 600_000),
    numPredict: savedManifest?.config?.numPredict ?? 1400,
    seed: intOption(options, '--seed', savedManifest?.config?.seed ?? (Date.now() >>> 0)),
    outputDir: options['--output-dir'] ?? 'arena-runs',
    resumeDir,
    confirmLargeRun: Boolean(options['--confirm-large-run']),
  });
  console.log(`Saved run: ${result.runDir}`);
} catch (error) {
  console.error(`\nERROR: ${error.message}`);
  if (resumeDir) console.error(`Progress is stored under ${path.resolve(resumeDir)}. Resume using the exact original task/config.`);
  process.exitCode = 1;
}
