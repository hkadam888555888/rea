# Stage 2 — ChatGPT App Mode: 100-Run Security Red Team

Use this mode inside the regular ChatGPT app, without a paid API key, Ollama, or an external automation runtime. It changes the workflow from candidate-vs-candidate debate to a persistent defensive security cycle: inspect, try to break previous fixes, log findings, remediate when access permits, and hand the next worker a complete state summary.

## Start here

1. Open a new ChatGPT conversation.
2. Paste the full [100-run security prompt](CHATGPT_100_WORKER_PROMPT.md).
3. Send your authorized scope using this command:

~~~text
ARENA SECURITY 100: [repository/project, branch or test environment, authorized scope, goals, constraints]
~~~

If the exact repository/project or authorization scope is not clear, the prompt should ask you one direct question and wait before testing.

Then send NEXT WORKER between runs. Each assistant response handles exactly one worker, from 001 through 100. Worker 002 and later must first retest previous fixes before examining their assigned security lens. Checkpoints are required every five completed workers and after major fix/retest cycles.

## What each worker does

- Checks the current available revision and retests prior fixes first.
- Reviews a distinct security lens: authentication, authorization, secrets, injection, browser security, SSRF boundaries, files, dependencies, CI/CD, business logic, multi-tenant isolation, and more.
- Updates the threat-objective register that lists what an attacker might want to steal, access, alter, execute, or disrupt.
- Deduplicates findings and records confidence separately from severity.
- Creates or updates GitHub security issues only when the connected GitHub integration genuinely has access and confirms success.
- Applies a red security label if that label already exists or available tools can create it. If label creation is unavailable, it uses a severity prefix in the issue title and reports the missing label instead of claiming the issue is red.
- Applies minimal patches on an authorized non-default branch when repository write access is actually available, adds regression tests, and leaves any PR unmerged.
- Hands forward the updated findings, revision, pending fixes, test evidence, and next worker's first retest action.

## The attacker-objectives box

The [Security Findings Ledger Template](SECURITY_FINDINGS_LEDGER_TEMPLATE.md) includes the central table for attacker objectives: credentials and tokens, account takeover, privilege escalation, sensitive data, integrity/tampering, code execution, file access, browser attacks, server-side fetches, business logic, availability, dependencies, CI/CD, cryptography, and monitoring/recovery. Each objective is marked NOT ASSESSED, ASSESSED—NO FINDING, FINDING, BLOCKED, or NOT APPLICABLE with evidence and links to finding IDs.

## GitHub issue policy

Each actionable root cause gets a stable SEC-001, SEC-002, ... ID and a detailed issue with evidence, preconditions, impact, safe reproduction, mitigation, regression test, discovery worker, retest worker, and links. Secrets and private data are redacted. Existing issues are reused for the same root cause. Patches do not close an issue automatically: a later worker must retest it. If GitHub integration/write permission is missing, the prompt outputs the issue draft and clearly marks the operation blocked.

The recommended red label is security:red with color #B60205. This prompt cannot create labels through a connector that exposes only issue operations. In that case, it must tell the owner the label is missing and never pretend the visual red marker exists.

## Required AI Conversation Hub checklist sync

After a vulnerability is confirmed through a safe reproduction within the authorized scope, add it immediately to the private AI Conversation Hub's [Security Release Checklist](https://github.com/hkadam888555888/ai-conversation-hub/blob/main/tests/security/SECURITY_RELEASE_CHECKLIST.md) using the same SEC finding ID. Include the project and tested revision, evidence/issue link, severity and confidence, product-side regression test path/command, fix reference and later-worker retest status. This must happen before that worker is marked complete. When access permits, add the regression test to the actual product repository's test suite; the hub checklist is an index, not a substitute for executable tests.

Before any production-ready recommendation, use the Hub's [Production-Readiness Grade](https://github.com/hkadam888555888/ai-conversation-hub/blob/main/tests/security/PRODUCTION_READINESS_GRADE.md). Open confirmed Critical/High findings, failed or untested required regression checks, missing candidate evidence, or absent owner approval block a READY recommendation regardless of score. Claim a record was saved only after a successful GitHub write and read-back.

## What "100 workers" means here

It means 100 sequential, role-conditioned worker runs—one per ChatGPT assistant response. They are not 100 different trained models, and all share the conversation history. This prompt cannot bypass ChatGPT usage/context limits. Save portable checkpoints, because the 100 audits and their retests may be too long for one uninterrupted session.

This workflow does not authorize testing unnamed or unrelated systems. Read-only source review is the default; active checks must stay in the named authorized local/staging scope and use synthetic data. No denial-of-service, destructive actions, real-data exfiltration, stealth, persistence, or uncontrolled brute force. No automatic merge or deployment.

## The local engine option

For automated local model requests and local persistence independent of the ChatGPT UI, see [Stage 2 Local Worker Engine](../stage-2-local-engine/README.md). That engine is not an automation controller for the ChatGPT app.

## Files

- [100-run security prompt](CHATGPT_100_WORKER_PROMPT.md)
- [Threat objective and findings ledger template](SECURITY_FINDINGS_LEDGER_TEMPLATE.md)
- [Stage 1 overview](../STAGE_1.md)
