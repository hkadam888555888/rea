# Stage 1 — ChatGPT Free Arena

## Goal

Ship the first usable no-paid-API phase of the Arena workflow: a repeatable competition between different candidate approaches, with explicit attacks, defenses, revisions, scoring, and a final evidence-based decision.

**Stage 1 is a review protocol, not a 100-agent runtime.** In one ChatGPT conversation, candidate drafts are generated perspectives within the same conversation. Manual multi-chat mode adds context separation through copy-and-paste, but does not create an automatic coordinator or guarantee independent models.

## What Stage 1 provides

- A locked task brief shared by every candidate.
- Four candidate perspectives in Quick mode or eight in Standard mode.
- Strategy cards that make approaches meaningfully different.
- Attack → defend/revise → score → advance rounds.
- A 100-point weighted rubric and a fatal-flaw rule.
- A final recommendation, unresolved-risk list, and portable checkpoint.
- A manual multi-chat path for separating first drafts across conversations.

## Quick setup

1. Open a new ChatGPT conversation.
2. Paste the full [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md) as the first message.
3. Send a second message using one of these commands:
   - `ARENA QUICK: [your task]` — 4 candidate perspectives, 2 rounds.
   - `ARENA: [your task]` — 8 candidate perspectives, 3 rounds.
   - `ARENA RETRY: [your task]` — compare the tournament result with an answer you rejected.
   - `ARENA MANUAL: 4` or `ARENA MANUAL: 8` — follow [MULTI_CHAT_GUIDE.md](MULTI_CHAT_GUIDE.md) for manual copy-and-paste coordination.
4. Check the score arithmetic, key evidence, remaining risks, and tests that were not run. Treat the winner as the best-supported candidate, not as guaranteed truth.

## Stage 2 — choose how to run 100 workers

### Option A: Stay inside the ChatGPT app

Use **[Stage 2 ChatGPT App Mode](stage-2-chatgpt-app/README.md)** if you want to use the ChatGPT app and no local model/API. Paste [the 100-worker prompt](stage-2-chatgpt-app/CHATGPT_100_WORKER_PROMPT.md) into a new conversation, send `ARENA CHATGPT 100: [task]`, then send `NEXT WORKER` for every subsequent worker until ID 100 is complete.

This is one worker draft per ChatGPT response. It uses the model ChatGPT serves to that conversation; it does not create 100 different model weights, and previous conversation history remains visible. The prompt cannot override product usage or context limits. The bracket then requires 99 matches, one per `NEXT MATCH` request, with checkpoints after each round.

### Option B: Run a local model programmatically

Use the [Stage 2 local worker engine](stage-2-local-engine/README.md) for automatic scheduling, isolated model requests through Ollama, output files, and resuming interrupted runs. This engine is not a controller for the ChatGPT app.

## How the workflow compares

| Capability | Stage 1 | ChatGPT App Mode | Local Engine Mode |
|---|---|---|---|
| Candidate drafts | 4 or 8 prompt perspectives | 100 sequential responses | Up to 100 isolated local requests |
| Different trained model weights | Not guaranteed | No | No, same local model by default |
| Worker initial prompts/context boundaries | One shared conversation or manual separate chats | Same ChatGPT conversation history | Separate request contexts |
| Attacks, revisions and judging | Prompt protocol | One matchup per ChatGPT response | Automated local model calls |
| Automatic local persistence | No | No; user keeps checkpoints | Yes |
| Paid API key required | No | No | No |

## Completion criteria

A tournament result must preserve actual candidate and match counts, specific attack/revision records, correct score arithmetic, unverified risks, and tests that were not run. Missing workers or match results must remain missing; never claim that an unfinished run is complete. A winner is a best-supported result from the selected protocol, not proof of correctness.

Use [VALIDATION_CHECKLIST.md](VALIDATION_CHECKLIST.md) for manual checks. Those checks remain unverified until someone actually performs them.

## Guardrails

- Never claim that real sub-agents, parallel workers, tests, files, or external changes were created unless the relevant operation happened.
- Do not expose hidden chain-of-thought; provide concise reasons, evidence, calculations, and uncertainty.
- Do not execute code, modify repositories, merge pull requests, publish, deploy, or spend money just because a candidate recommends it. Consequential actions need separate user authorization.
- For reverse engineering, analyze software you own or are authorized to inspect. Do not help bypass licensing, activation, or access controls.
