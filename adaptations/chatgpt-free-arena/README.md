# ChatGPT Free Arena

A staged no-paid-API adaptation inspired by the public [Arena Skill](https://github.com/Jakeschincariol/arena-skill) project.

## Start here

- [Stage 1 guide](STAGE_1.md) — prompt protocol for structured solution review.
- [Stage 1 quick start](STAGE_1_STARTER.md) — run a basic tournament in ChatGPT Free.
- [Stage 1 prompt](CHATGPT_ARENA_PROMPT.md) — general candidate attack/defend/revise tournament.
- **[Stage 2 ChatGPT App Security Mode](stage-2-chatgpt-app/README.md)** — 100 sequential defensive red-team worker runs, findings, GitHub issue logging, remediation, and retesting.
- [Stage 2 local engine](stage-2-local-engine/README.md) — local Ollama worker tournament, separate from the ChatGPT app UI.

## Security mode — recommended for bug hunting

Paste [the 100-run security prompt](stage-2-chatgpt-app/CHATGPT_100_WORKER_PROMPT.md) into a fresh ChatGPT conversation, then send:

~~~text
ARENA SECURITY 100: [authorized repository/project, branch or test environment, scope, goals, constraints]
~~~

It runs one worker per response. Every subsequent worker receives the current ledger and handoff, retests previous fixes, explores the next security lens, deduplicates findings, and fixes confirmed vulnerabilities when repository write access is real. Findings can be logged to GitHub issues and marked with a red security label if the repository has that label and the connected integration can apply it. If GitHub access or label creation is missing, the assistant must state the blocker and provide the issue/patch draft instead.

See the [Security Findings Ledger Template](stage-2-chatgpt-app/SECURITY_FINDINGS_LEDGER_TEMPLATE.md) for the central attacker-objective register—the box listing what an attacker might want to obtain, control, alter, execute, or disrupt—and the all-runs findings index.

## Important limits

ChatGPT App Mode performs 100 sequential, role-conditioned runs of the same ChatGPT conversation, not 100 different trained models. Conversation history is shared, and ChatGPT usage/context limits still apply. It does not automatically authorize attacks against arbitrary systems; test only named projects you own or are authorized to assess. Default to source review and local/staging tests with synthetic data. No destructive operations, denial-of-service, real-data exfiltration, stealth, persistence, automatic merge, or deployment.

The local engine is a separate program using a local Ollama model; it does not automate ChatGPT app UI.

## Stage 1 quick start

1. Open a new ChatGPT conversation.
2. Paste the full [CHATGPT_ARENA_PROMPT.md](CHATGPT_ARENA_PROMPT.md).
3. Send ARENA QUICK: [your task] for four candidate perspectives, or ARENA: [your task] for eight.

For every confirmed, successfully reproduced vulnerability in security mode, update the private AI Conversation Hub's [security regression checklist](https://github.com/hkadam888555888/ai-conversation-hub/blob/main/tests/security/SECURITY_RELEASE_CHECKLIST.md) before that worker is complete. Link the finding/issue, tested revision, evidence, product-side regression-test path, fix, and later-worker retest. Before any shipping recommendation, apply the Hub's [production-readiness grade](https://github.com/hkadam888555888/ai-conversation-hub/blob/main/tests/security/PRODUCTION_READINESS_GRADE.md); hard security gates override numeric scores.

## Evidence and safeguards

Findings must include evidence, confidence, realistic impact, preconditions, safe reproduction, and remediation guidance. A patch is not verified until a later worker retests it. A high severity issue must not be represented as confirmed without evidence, and a winner or completed checklist is not proof that a system is secure.

## Provenance and licensing

The design was informed by source-level inspection of Jake Schincariol's MIT-licensed [arena-skill](https://github.com/Jakeschincariol/arena-skill). This is an independent adaptation, not an official OpenAI integration and not endorsed by the original author. The evidence-first documentation style was also informed by [REA](https://github.com/morluto/rea).
