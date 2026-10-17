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

## Stage 1 workflow

1. **Lock the brief.** Record task, hard constraints, provided facts, acceptance checks, and unknowns. Ask one targeted question only if a missing detail would materially change the outcome.
2. **Draft candidates.** Give each candidate the exact same brief and one distinct card from [STRATEGY_CARDS.md](STRATEGY_CARDS.md). Do not let candidates see one another's initial drafts.
3. **Attack each pairing.** Require specific claims or choices to be challenged, with severity and a counterexample, source, logical reason, or test where possible.
4. **Defend and revise.** Every attack must be conceded, partly conceded, or rebutted. Accepted criticism must produce a revised answer; the revision must be checked for regressions.
5. **Judge.** Apply the weights in [RUBRIC.md](RUBRIC.md). A verified fatal flaw cannot lose to a non-fatal candidate solely because of a higher numeric score.
6. **Advance and record.** Keep the winner, raw scores, decisive issue, and remaining uncertainty. Do not invent missing results.
7. **Report.** Return the winning deliverable, decisive attacks survived, scores, limits, and a checkpoint when continuation may be needed.

## Stage 2 — actual local worker executions

For separately executed worker jobs with per-worker files, automatic attack/revision calls, bracket advancement, persistent progress, and a CLI, use the [Stage 2 local worker engine](stage-2-local-engine/README.md).

Stage 2 uses Node.js 22+ and a locally running Ollama model; it does not turn ChatGPT Free's web interface into an API. It can execute up to 100 initial worker runs with 100 distinct combinations of approach and focus. Workers share the same local model by default but receive isolated prompts. A 100-worker run can create hundreds of model requests, so begin with four workers and concurrency one. See [Architecture](stage-2-local-engine/docs/ARCHITECTURE.md) for the actual execution boundaries and limitations.

## How Stage 1 differs from the 100-worker target

| Capability | Stage 1 | Stage 2 |
|---|---|---|
| Four or eight candidate drafts | Prompt protocol | Supported as local jobs |
| Up to 100 initial worker executions | Not provided | Supported through Ollama |
| Independent initial prompt/context per worker | Manual chat separation only | Yes, separate inference requests |
| Different trained model weights per worker | Not guaranteed | Not provided by default |
| Attack, defense, and revision rounds | Prompt protocol | Automated local inference workflow |
| Automatic collection and persistent logs | Not provided | Saved to local run directory |
| Code execution or web search | Not provided | Not provided |
| Paid API key required | No | No |

Stage 1 validates the tournament procedure; Stage 2 automates the repeatable worker and match workflow locally. Neither makes the winner objectively correct.

## Completion criteria

Stage 1 is ready for a small pilot when a user can run a writing task and a logic/code task and the protocol:

- uses the same task brief for every candidate;
- preserves actual candidate count and match records;
- gives specific attack/defense/revision records;
- computes rubric totals correctly;
- does not claim that code was executed unless a tool actually ran it;
- retains uncertainty and identifies unchecked tests;
- can resume from a checkpoint without fabricating missing history.

Use [VALIDATION_CHECKLIST.md](VALIDATION_CHECKLIST.md) to record manual checks. Those checks remain unverified until someone actually performs them.

## Guardrails

- Never claim that real sub-agents, parallel workers, tests, files, or external changes were created unless the relevant operation happened.
- Do not expose hidden chain-of-thought; provide concise reasons, evidence, calculations, and uncertainty.
- Do not execute code, modify repositories, merge pull requests, publish, deploy, or spend money just because a candidate recommends it. Consequential actions need separate user authorization.
- For reverse engineering, analyze software you own or are authorized to inspect. Do not help bypass licensing, activation, or access controls.
