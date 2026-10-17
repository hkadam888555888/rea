# Manual multi-chat mode

Use this method when you want more separation between candidate drafts than one conversation can provide. It requires manual copy-and-paste; there is no cross-chat coordinator, automatic synchronization, or promise that ChatGPT Free will allow every requested conversation within its current limits.

## Setup

1. Open one conversation to act as the Arena coordinator. Paste CHATGPT_ARENA_PROMPT.md there.
2. Ask the coordinator to produce a Task Lock and a set of four or eight candidate cards. Confirm that the Task Lock contains the relevant requirements.
3. Open one separate conversation for each candidate. In each conversation, paste the same Task Lock and only that candidate's strategy card.
4. At the end of each candidate prompt, add: “Return one complete answer to the locked task. Identify assumptions and unverified claims. Do not critique other candidates because you have not seen them.”
5. Copy each candidate's response into the coordinator conversation, label it C1, C2, and so on, and tell the coordinator: “ARENA COLLECT CANDIDATES. Preserve each draft exactly as provided; begin the attack/defend/judge rounds.”
6. Let the coordinator compare the candidates using the rubric and the prescribed bracket. Request a checkpoint after each round if needed.

## Prompt to use in each candidate conversation

You are one candidate in a manual ChatGPT Free Arena. You are not an actual separate agent process and you must not claim to be one. Complete the Task Lock below using only the single strategy card supplied after it. Return a useful complete solution, list key assumptions and unverified facts, and state which acceptance checks were not run. Do not invent sources, test output, or actions. Do not critique the other candidates because their drafts are not available in this conversation.

TASK LOCK:
[Paste the exact same task lock into every candidate conversation.]

YOUR SINGLE STRATEGY CARD:
[Paste exactly one distinct card from STRATEGY_CARDS.md.]

## Keep the comparison fair

- Paste the same Task Lock into every candidate chat without adding extra hints.
- Change only the strategy card and candidate ID.
- Do not let a candidate see another candidate's answer before producing its first draft.
- Keep candidate IDs stable through every round.
- If a candidate reply is missing, mark it missing and request it again once. Never make up its contents.
- In the judging stage, provide candidate drafts and attack/defense records, but omit strategy-card text where practical.
- Separate conversations reduce shared conversation context; they do not guarantee different models or full independence.
- For a large task, prefer four candidates and two rounds. Eight candidates may be slow or use more of the user's normal quota. Use sixteen only when deliberately requested and the user is willing to manage the larger manual workload.

## Limits

This method does not start 4, 8, or 16 agents automatically. It does not create persistent storage, run tools across tabs, guarantee equal account limits, or make a tournament result objectively correct. Use the checkpoint format in CHATGPT_ARENA_PROMPT.md for a portable record.
