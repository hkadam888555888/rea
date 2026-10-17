# Stage 1 — ChatGPT Free Arena

## Goal

Stage 1 is the first no-paid-API review protocol. For general problem-solving tasks, it creates distinct candidate approaches and compares them using an explicit attack/defend/revise process.

**For security testing, use the newer [Stage 2 ChatGPT App Security Mode](stage-2-chatgpt-app/README.md).** It replaces candidate-vs-candidate debate with a 100-run defensive loop where later workers retest previous fixes, log vulnerabilities, and remediate when authorized access permits.

## General problem-solving mode

1. Open a new ChatGPT conversation.
2. Paste the full [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md).
3. Send ARENA QUICK: [your task] for four candidate perspectives and two rounds, or ARENA: [your task] for eight perspectives and three rounds.
4. Keep uncertainty, test gaps, score math, and a portable checkpoint.

## Security mode

Use [Stage 2 ChatGPT App Security Mode](stage-2-chatgpt-app/README.md). Paste [CHATGPT_100_WORKER_PROMPT.md](stage-2-chatgpt-app/CHATGPT_100_WORKER_PROMPT.md), then send:

~~~text
ARENA SECURITY 100: [authorized repository/project, branch or test environment, scope, goals, constraints]
~~~

The security mode tracks attacker objectives (credentials, accounts, privileges, sensitive data, integrity, code execution, files, browser attacks, business logic, dependencies, CI/CD, and more), creates stable findings and GitHub issue drafts/records, applies available red security labels, fixes vulnerabilities where authorized, and requires subsequent workers to try bypassing those fixes.

## What to remember

- ChatGPT App Mode means 100 sequential runs of the model served to the same conversation—not 100 different trained models.
- Use only an explicitly authorized target and defined local/staging testing scope.
- Never claim files, issues, labels, patches, tests, or repository access unless an actual tool result confirms it.
- A patch stays unverified until a later worker retests it. Keep PRs unmerged and deployments manual.
- Save checkpoints; the app's context and usage limits cannot be overridden by a prompt.

For automated local model requests instead of the ChatGPT app, see [Stage 2 Local Worker Engine](stage-2-local-engine/README.md).
