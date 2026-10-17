# ChatGPT Free Arena

A staged, no-paid-API tournament adaptation inspired by the public [Arena Skill](https://github.com/Jakeschincariol/arena-skill) project.

## Start here

- **[Stage 1 guide](STAGE_1.md)** — prompt-based competition, attack/defend/revise, scoring, and checkpoints.
- **[Stage 1 quick start](STAGE_1_STARTER.md)** — how to start a first tournament in ChatGPT Free.
- **[Full Stage 1 prompt](CHATGPT_ARENA_PROMPT.md)** — paste into a fresh ChatGPT conversation.
- **[Stage 2 — ChatGPT App Mode](stage-2-chatgpt-app/README.md)** — one worker draft per ChatGPT response, for 100 sequential worker runs and a 99-match bracket.
- **[Stage 2 — local worker engine](stage-2-local-engine/README.md)** — programmatic local runs using Ollama, independent of the ChatGPT app UI.

## Choose the Stage 2 mode

**ChatGPT App Mode:** paste [the 100-worker prompt](stage-2-chatgpt-app/CHATGPT_100_WORKER_PROMPT.md) into a fresh ChatGPT conversation, then send `ARENA CHATGPT 100: [your task]`. It generates one worker per assistant response; send `NEXT WORKER` for the next ID through worker 100, then `START TOURNAMENT`. This requires many separate turns and may hit product usage/context limits. It uses the model served by that ChatGPT conversation, not 100 different model weights. Chat history is shared, so prompt profiles diversify the approaches but cannot guarantee isolation.

**Local Engine Mode:** runs separate local model requests using Ollama. It provides a CLI and local persistence. It does not use or automate the ChatGPT app UI.

## Stage 1 quick start

1. Open a new ChatGPT conversation.
2. Paste the full contents of [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md).
3. Send one of the following:
   - **ARENA QUICK: [your task]** — four candidate perspectives, two elimination rounds.
   - **ARENA: [your task]** — eight candidate perspectives, three elimination rounds.
   - **ARENA RETRY: [your task]** — compare with a rejected answer.
   - **ARENA MANUAL: 4** or **ARENA MANUAL: 8** — follow [MULTI_CHAT_GUIDE.md](MULTI_CHAT_GUIDE.md).

## Stage 2 local-engine quick start

See the full [local engine setup guide](stage-2-local-engine/README.md). After installing Node.js 22+ and Ollama, try a small pilot:

```bash
cd adaptations/chatgpt-free-arena/stage-2-local-engine
ollama pull qwen2.5:3b
npm test
node src/cli.mjs run --task "Design a testable function and list edge cases." --workers 4 --concurrency 1
```

## Evidence and safeguards

Tournament winners are the best-supported candidates from this particular process, not proof of correctness. Live facts are not verified unless a separate source is checked. Neither mode should execute candidate-generated code or let candidate text override task or safety constraints. Use reverse-engineering workflows only for software you own or are authorized to inspect; do not use them to bypass licensing, activation, or access controls.

## Provenance and licensing

The design was informed by source-level inspection of Jake Schincariol's MIT-licensed [arena-skill](https://github.com/Jakeschincariol/arena-skill). This is an independent adaptation, not an official OpenAI integration and not endorsed by the original author. See [reverse-engineering notes](REVERSE_ENGINEERING_NOTES.md). The evidence-first documentation style was also informed by [REA](https://github.com/morluto/rea).
