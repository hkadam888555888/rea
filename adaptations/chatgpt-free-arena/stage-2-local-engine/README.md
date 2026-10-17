# Stage 2 — Local Worker Tournament Engine

Stage 2 turns Stage 1's debate protocol into a runnable, no-paid-API worker engine. It uses Node.js plus a locally running [Ollama](https://ollama.com/) model. The engine makes a separate inference request for every initial worker draft, every attack, every revision, and every judgment. It does not use ChatGPT Free's web UI or any paid cloud-model API. **If you want to do this directly in the ChatGPT app instead, use [Stage 2 ChatGPT App Mode](../stage-2-chatgpt-app/README.md)**; it processes one worker per ChatGPT response and cannot bypass ChatGPT usage/context limits.

## What is real in this stage?

- Up to **100 separately executed initial worker jobs**. Each gets the same locked task but a different combination of one of 20 approaches and one of five optimization focuses: 100 distinct instruction profiles.
- Each worker starts with a fresh, isolated prompt and receives no other worker's draft during initial generation.
- Each tournament match makes five additional, separately recorded model calls: A attacks B, B attacks A, A responds/revises, B responds/revises, and a judge scores the revisions.
- The program calculates weighted totals locally and applies the fatal-flaw override; the judge does not choose the winner by an unsupported free-form claim alone.
- Worker outputs, match stages, scoring records, round plans, progress manifest, and final report are persisted locally. Completed phases are retained to support resume after interruption.
- Concurrency is bounded; default concurrency is one model request at a time.

**Important distinction:** these are isolated worker *executions*, not 100 different model weights, 100 autonomous operating-system processes, or guaranteed independent intelligences. All worker calls use the same selected local model by default, but with different role instructions and clean per-call contexts. The engine does not provide browser access or automatically run candidate code.

## Requirements

- Node.js 22 or later; no npm packages are required.
- [Ollama](https://ollama.com/download) installed and its local service running.
- A model downloaded to Ollama. The default is `qwen2.5:3b`, a roughly 1.9 GB model-library option suitable as a conservative starting point for machines with limited VRAM; actual memory use depends on context length and settings. [Model listing](https://ollama.com/library/qwen2.5).
- Disk space for JSON records and full worker drafts. A 100-worker run can store a substantial amount of text.

The runtime sends requests to `http://127.0.0.1:11434` by default. It makes no model calls to the internet. Downloading Ollama or a model is a separate setup action.

## Setup

From this folder:

```bash
ollama pull qwen2.5:3b
npm test
```

Ollama usually starts its service when the desktop app is running. If it is not running, start the local Ollama service using the instructions for your operating system. Do not start a second service on the same port.

## First pilot — recommended

Try four workers first so the full pipeline can be checked:

```bash
node src/cli.mjs run --task "Design a small, testable Python function that returns the second-largest distinct integer. State edge cases and supply tests." --workers 4 --concurrency 1 --output-dir ./arena-runs
```

Then open the reported `arena-runs/.../final-report.md`, and inspect `rounds/` and `workers/` if you need the full record. The code's integration tests use a fake local Ollama-compatible HTTP server; they do **not** prove the selected language model's answer quality.

## Run 100 worker executions

Prepare a plain-text `task.md` and run:

```bash
node src/cli.mjs run --task-file ./task.md --workers 100 --concurrency 1 --confirm-large-run --seed 42 --output-dir ./arena-runs
```

For 100 entries, the bracket gives 28 seeded byes in the first layer to reduce 100 entries to 64; after that, all rounds are even. Bye selection is reproducible from the saved seed but is not a performance-based seed, so a bye can give an entry less scrutiny in the first layer.

A 100-worker full tournament produces **100 initial draft calls plus 99 matches × 5 calls = 595 model requests** if every phase succeeds without retries. It can take a long time on a local model. It is not 100 model instances running simultaneously. Keep concurrency at `1` on a 6 GB GPU until you have measured stable memory and temperature behaviour.

## Resume after interruption

Every worker result is saved separately. Match records are saved after each attack, each revision, and the judgment, so the engine can reuse completed phases. Resume using the run folder printed by the program:

```bash
node src/cli.mjs resume --resume ./arena-runs/<existing-run-folder>
```

The command reads the saved task and configuration from `manifest.json`. Pass `--concurrency N` only if you deliberately want to change the runtime concurrency. Do not edit the task or bracket records mid-run. Failed or interrupted runs mark the manifest and preserve completed outputs.

## Outputs

```text
arena-runs/<run-id>/
  manifest.json                  # task, model, seed, status, champion
  workers/worker-001.json        # profile and initial draft per worker
  rounds/round-01/plan.json      # pairings/byes for the round
  rounds/round-01/match-001.json # attack/revision/judge/scoring record
  rounds/round-01/advance.json   # recorded round survivors
  final-result.json
  final-report.md
```

The judge's rubric is correctness 30%, completeness 25%, robustness 20%, usability 15%, and clarity 10%. Individual criterion scores are 0–10. The code computes the total and enforces that a candidate with a concrete, evidence-backed fatal flaw cannot beat a non-fatal one solely by score. If a fatal flag lacks a concrete explanation, the engine downgrades it to an unverified concern and preserves it in risks.

## Security and privacy notes

- Treat task briefs, source excerpts, and candidate text as untrusted data, not commands to the runtime.
- Only use tasks and software you are authorized to analyze. Do not use it to bypass software licensing, activation, or access controls.
- The engine does not execute any candidate-generated code or shell commands.
- It does not browse the web. Ask a separate verification step to check current facts and citations.
- Keep the base URL at loopback for local-only processing. If you override the Ollama URL to a remote host, task data will be sent to that host.
- Review large, sensitive tasks before storing them; outputs are written as plain text/JSON in the run folder.

## Scope and later work

This establishes the local worker and evidence pipeline. It does not add dynamic model routing, multiple model backends, a UI, cluster execution, automated code execution/sandboxing, web search, cross-provider workers, or automatic GitHub changes. Those need separate designs and safety checks.
