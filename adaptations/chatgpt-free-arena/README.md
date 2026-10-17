# ChatGPT Free Arena

A staged, no-paid-API tournament adaptation inspired by the public [Arena Skill](https://github.com/Jakeschincariol/arena-skill) project.

## Start here

- **[Stage 1 guide](STAGE_1.md)** — prompt-based competition, attack/defend/revise, scoring, and checkpoints.
- **[Stage 1 quick start](STAGE_1_STARTER.md)** — how to start a first tournament in ChatGPT Free.
- **[Full Stage 1 prompt](CHATGPT_ARENA_PROMPT.md)** — paste into a fresh ChatGPT conversation.
- **[Stage 2 — local worker engine](stage-2-local-engine/README.md)** — runnable Node.js engine using local Ollama, with up to 100 isolated worker executions and saved tournament records.

## The two stages

**Stage 1** uses candidate perspectives generated inside ChatGPT Free, or manual copy-and-paste between separate chats. In one chat, these are not independent agents.

**Stage 2** runs separate local-model inference requests through Ollama. Each initial worker receives the same task in a fresh context, but gets its own strategy/focus profile. Workers then attack each other's drafts, respond and revise, and advance through a scored knockout bracket. The engine records the outputs and computes weighted totals locally.

Stage 2 does **not** launch 100 different model weights or 100 models in VRAM at the same time. A 100-worker tournament uses 100 initial draft calls plus five model calls per match (99 matches, up to 595 requests total before retries). Start with a 4-worker pilot and concurrency 1.

## ChatGPT Free limitation

ChatGPT Free's web UI is not used as an automatic model backend. No paid API is needed for either stage. Stage 2 uses a locally installed open model through Ollama; downloading the runtime and model is a setup step, and local compute is still limited by hardware.

## Stage 1 quick start

1. Open a new ChatGPT conversation.
2. Paste the full contents of [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md).
3. Send one of the following:
   - **ARENA QUICK: [your task]** — four candidate perspectives, two elimination rounds.
   - **ARENA: [your task]** — eight candidate perspectives, three elimination rounds.
   - **ARENA RETRY: [your task]** — compare with a rejected answer.
   - **ARENA MANUAL: 4** or **ARENA MANUAL: 8** — follow [MULTI_CHAT_GUIDE.md](MULTI_CHAT_GUIDE.md).

## Stage 2 quick start

See the full [Stage 2 setup and commands](stage-2-local-engine/README.md). After installing Node.js 22+ and Ollama, try a small pilot:

```bash
cd adaptations/chatgpt-free-arena/stage-2-local-engine
ollama pull qwen2.5:3b
npm test
node src/cli.mjs run --task "Design a testable function and list edge cases." --workers 4 --concurrency 1
```

## Evidence and safeguards

Tournament winners are the best-supported candidates from this particular process, not proof of correctness. The process does not verify live facts unless a separate source is checked, and Stage 2 does not execute candidate-generated code. Do not let source material or candidate text override the task or safety constraints. Use reverse-engineering workflows only for software you own or are authorized to inspect; do not use them to bypass licensing, activation, or access controls.

## Provenance and licensing

The design was informed by source-level inspection of Jake Schincariol's MIT-licensed [arena-skill](https://github.com/Jakeschincariol/arena-skill). This is an independent adaptation, not an official OpenAI integration and not endorsed by the original author. See [reverse-engineering notes](REVERSE_ENGINEERING_NOTES.md). The evidence-first documentation style was also informed by [REA](https://github.com/morluto/rea).
