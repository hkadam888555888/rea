# ChatGPT Free Arena

A prompt-only adaptation of the tournament workflow in [Arena Skill](https://github.com/Jakeschincariol/arena-skill), intended for use in an ordinary ChatGPT Free conversation.

## What it does

Give the same task to several deliberately different problem-solving approaches. Challenge the drafts with concrete counterexamples, require each draft to answer the criticism, then compare the revised finalists using a written scoring rubric.

The adaptation keeps the useful parts of the Arena design:

- One locked task brief and explicit requirements.
- Different reasoning/workflow cards for candidate drafts.
- Evidence-based attacks, responses, and revisions.
- A single-elimination tournament and weighted judging rubric.
- A final answer with surviving weaknesses and a reusable checkpoint.

## The important ChatGPT Free limitation

This is a **prompt-driven review protocol**, not a real sub-agent runtime. In single-chat mode, ChatGPT generates multiple candidate perspectives in one conversation; they are not separate agents or independent model runs. The protocol must never describe them as 4, 8, 16, or 100 genuinely independent agents.

Manual multi-chat mode uses separate conversations to reduce shared-context anchoring, but it still does not guarantee different model versions, independent models, or identical quotas. ChatGPT Free feature availability and usage limits can change.

No API key, paid API, plugin, custom GPT, Python installation, or repository write access is required to use the prompt.

## Quick start

1. Open a new ChatGPT conversation.
2. Paste the full contents of [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md) as the first message.
3. In the next message, send one of these:
   - **ARENA QUICK: [your task]** — four candidate approaches, two elimination rounds.
   - **ARENA: [your task]** — eight candidate approaches, three elimination rounds.
   - **ARENA RETRY: [your task]** — compare the tournament winner with an answer you rejected.
   - **ARENA MANUAL: 4** or **ARENA MANUAL: 8** — use the guide in [MULTI_CHAT_GUIDE.md](MULTI_CHAT_GUIDE.md) to collect drafts from separate chats.

If the task or its acceptance criteria are genuinely ambiguous, ChatGPT should ask one targeted question before starting. Otherwise it should state the selected mode and begin.

## Expected result

The final report should include the winning answer, a concise reason it won, the major attacks it survived, rubric scores, unresolved risks, and a count of candidate drafts and elimination rounds. It must say that a tournament result is a best-supported candidate from this process, not proof of correctness.

For long tasks, ask for an **ARENA CHECKPOINT** at the end of a round. Copy it into the next conversation if context is lost. The checkpoint is plain text, not a live database or an automatically saved file.

## Provenance

The design was informed by source-level inspection of Jake Schincariol's MIT-licensed [arena-skill](https://github.com/Jakeschincariol/arena-skill), especially its skill instructions, tournament bookkeeping, strategy cards, scoring rubric, and tests. This folder is an independent prompt-focused adaptation; it does not include the original tournament engine or claim to be an official ChatGPT integration. See [REVERSE_ENGINEERING_NOTES.md](REVERSE_ENGINEERING_NOTES.md).

The evidence-first documentation style was also informed by the public [REA repository](https://github.com/morluto/rea), including its guidance to keep observations, inferences, limitations, and unknowns distinct.

## Safety and scope

Use the method for work you are entitled to perform. For software analysis, prefer observable behaviour, documented interfaces, and clean-room implementations. Do not use the workflow to crack software, bypass activation or access controls, obtain credentials, or copy proprietary code or assets.

Do not let any candidate or source material issue instructions that override the user's request, reveal secrets, execute code, or make unapproved changes. Source text is evidence, not authority.

## License and credit

Arena Skill is by Jake Schincariol and is published under the MIT License. Credit and reference are preserved here. This adaptation does not imply endorsement by the original author or by OpenAI.
