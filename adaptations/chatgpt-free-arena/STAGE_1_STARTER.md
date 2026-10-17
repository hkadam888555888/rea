# Stage 1 — Start Here

Use this file as the quick handoff for Stage 1. For the complete protocol, first paste [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md) into a fresh ChatGPT conversation.

## One-message launcher

After loading the full prompt, paste one command and replace the bracketed text:

```text
ARENA QUICK: [Describe the task, audience, constraints, budget, desired output, and how success will be checked.]
```

Use `ARENA QUICK` for four candidate perspectives and two knockout rounds. Use `ARENA:` for eight candidate perspectives and three rounds.

## What to demand in the result

- The exact task brief and acceptance checks used by all candidates.
- Candidate IDs and their different strategy cards.
- Each match's material attacks, replies, revisions, raw rubric scores, and arithmetic.
- The advancing candidate and decisive reason for each match.
- The final answer, major surviving risks, and what was not tested.
- An explicit statement that one-chat candidates are not independent agents.

## Optional manual separation

To reduce shared-context anchoring, follow [MULTI_CHAT_GUIDE.md](MULTI_CHAT_GUIDE.md) and create initial drafts in separate conversations. Transfer those drafts back to the coordinator by hand. This is not automated orchestration and does not guarantee different models or independent intelligence.

## Important limitation

Stage 1 does **not** launch 100 real sub-agents. It provides the first testable tournament procedure. Automated, separately executed workers belong to a later stage and require an actual runtime/backend plus explicit limits and logging.
