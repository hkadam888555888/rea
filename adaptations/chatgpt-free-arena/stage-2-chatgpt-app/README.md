# Stage 2 — ChatGPT App Mode (100 sequential worker runs)

Use this mode when the work must happen inside the regular ChatGPT app, without a model API, Ollama, or an external automation runtime.

**This mode does not launch 100 different trained models.** It asks ChatGPT to process 100 numbered worker profiles in sequence, with one worker generated per assistant response. Each response is a new ChatGPT generation, but all responses use whatever model ChatGPT serves for that conversation and share the conversation history. They are not 100 independent model instances, and a prompt cannot bypass ChatGPT's current usage, context, or message limits.

## What the workflow does

1. Lock the task and requirements.
2. Set up a deterministic roster of 100 unique worker profiles: 20 approaches × 5 optimization focuses.
3. Generate only one worker draft in each assistant response. Do not skip IDs, batch workers, or claim that future workers were run.
4. Track completed/missing worker IDs and save checkpoints after every 10 workers.
5. After all 100 initial drafts exist, create a single-elimination bracket.
6. Run each matchup one at a time, using the documented attack → defend/revise → judge process. A 100-entry bracket requires 99 matches.
7. Keep records, score arithmetic, surviving risks, and the final answer in the conversation/checkpoint.

## Start

1. Open a new ChatGPT conversation in the app.
2. Paste the complete contents of [CHATGPT_100_WORKER_PROMPT.md](CHATGPT_100_WORKER_PROMPT.md).
3. In your next message, send:

```text
ARENA CHATGPT 100: [describe the task, goal, constraints, budget, expected output, and acceptance checks]
```

ChatGPT initializes the roster and generates worker 001 in the same response. After reviewing the result, send `NEXT WORKER` to request the next one. Repeat until worker 100 is complete. If you want to pause, send `ARENA CHECKPOINT` and save the returned checkpoint outside the chat.

After worker 100, send `START TOURNAMENT`. The bracket uses 36 first-layer matches plus 28 byes to reduce 100 entries to 64, then 63 matches to select a champion: 99 matches total.

## Important practical limits

- This is deliberately serial: one worker draft per assistant response. No parallelism is claimed.
- ChatGPT responses share chat history; the prompt tells each worker not to rely on previous candidate drafts, but it cannot erase those drafts from the model's visible context. Shared-context bias remains possible.
- 100 worker drafts plus 99 matchups will be a large, long-running chat. Message limits or context limits can interrupt it. Save checkpoint files every 10 workers and after each bracket round. A checkpoint is portable text; it is not automatically saved to GitHub or your device.
- If ChatGPT refuses or reaches a limit, stop and resume later. Do not ask it to pretend missing worker IDs or matches are complete.
- One match per turn is required during the tournament. Each match response must show both attacks, both defenses/revisions, rubric scores, the runtime arithmetic, and the advancing candidate, but they are still roles within one ChatGPT response, not five independent model calls.
- The prompt cannot force hidden product features or override system instructions, account quotas, safety limits, or model availability.

## Relationship to the local engine

The [local Ollama engine](../stage-2-local-engine/README.md) provides actual programmatic scheduling and local persistence. This ChatGPT App Mode is the compatible manual path for users who want to stay in the app UI. The local engine cannot automate the ChatGPT app UI and must not be presented as doing so.

## Files

- [100-worker prompt](CHATGPT_100_WORKER_PROMPT.md)
- [Stage 1 protocol](../STAGE_1.md)
- [Local engine alternative](../stage-2-local-engine/README.md)
