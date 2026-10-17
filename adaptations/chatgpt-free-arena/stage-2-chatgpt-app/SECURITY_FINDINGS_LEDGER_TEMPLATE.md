# Security Findings Ledger — 100-Run Red Team Loop

This is a central index for one explicitly authorized project. A detailed issue should exist for each actionable root cause when GitHub write access is genuinely available. Never store actual passwords, live tokens, private keys, or sensitive customer records here.

## Scope lock

| Field | Value |
|---|---|
| Project/repository | NOT SET |
| Authorization basis | NOT SET |
| Branch/commit under test | NOT SET |
| Local/staging environment | NOT SET |
| Allowed methods | NOT SET |
| Excluded targets/actions | NOT SET |
| Synthetic test data | NOT SET |
| Human approvals / rollback | NOT SET |
| Last verified revision | NOT SET |
| Last updated worker | NONE |

Do not start active security tests until authorization and scope are explicit.

## Threat Objective Register — what an attacker may seek

Status values: NOT ASSESSED, ASSESSED—NO FINDING, FINDING, BLOCKED, NOT APPLICABLE. These states record what was actually examined, not a guarantee of safety.

| ID | Attacker objective / protected asset | Status | Finding IDs | Evidence/test links | Latest worker |
|---|---|---|---|---|---|
| T01 | Passwords, API keys, signing keys, OAuth secrets, recovery codes, service tokens | NOT ASSESSED | — | — | — |
| T02 | Account takeover, login/recovery bypass, stolen session/token misuse | NOT ASSESSED | — | — | — |
| T03 | Unauthorized roles/admin, IDOR/BOLA, privilege escalation, tenant crossing | NOT ASSESSED | — | — | — |
| T04 | Private/customer data, personal info, source secrets, environment variables, backups, logs | NOT ASSESSED | — | — | — |
| T05 | Unauthorized modification/deletion, forged transactions, poisoned data, audit tampering | NOT ASSESSED | — | — | — |
| T06 | Code execution or injection: SQL/NoSQL/command/template/deserialization | NOT ASSESSED | — | — | — |
| T07 | Unauthorized file reads/writes, path traversal, malicious uploads/archive extraction | NOT ASSESSED | — | — | — |
| T08 | Browser/client exploits: XSS, CSRF, clickjacking, unsafe CORS, redirects, messaging | NOT ASSESSED | — | — | — |
| T09 | SSRF, unsafe webhook/server fetches, internal resource access (only if explicitly scoped) | NOT ASSESSED | — | — | — |
| T10 | Payment/refund/business workflow abuse, quota/rate limit bypass, races | NOT ASSESSED | — | — | — |
| T11 | Resource exhaustion/service disruption (controlled low-impact tests only) | NOT ASSESSED | — | — | — |
| T12 | Vulnerable/malicious dependencies, package/update/artifact supply chain | NOT ASSESSED | — | — | — |
| T13 | CI/CD, build, deployment permissions/secrets, release controls | NOT ASSESSED | — | — | — |
| T14 | Cryptography, key lifecycle, randomness, TLS/transport configuration | NOT ASSESSED | — | — | — |
| T15 | Alerting/logging gaps, unsafe error details, backups, restore, incident response | NOT ASSESSED | — | — | — |

## Finding register

Use sequential IDs SEC-001, SEC-002, etc. Keep one finding per distinct root cause. Deduplicate repeated reports and append each worker's retest evidence to the existing issue.

| Finding ID | First worker | Last retest worker | Severity | Confidence | Root-cause title | Lifecycle | GitHub issue | Fix PR/commit | Regression test | Latest evidence |
|---|---:|---:|---|---|---|---|---|---|---|---|
| — | — | — | — | — | No findings logged yet | — | — | — | — | — |

## Worker run ledger

A worker is complete only after a report and handoff exist. A blank row is not a completed pass.

| Worker | Lens/mode | Revision inspected | Prior fixes retested | New findings | Issue IDs/URLs | Fixes/PRs | Tests actually run | Status | Next action |
|---:|---|---|---|---|---|---|---|---|---|
| 001 | Baseline audit | NOT STARTED | N/A | — | — | — | — | NOT STARTED | Lock scope |
| 002–100 | Fixed roster | — | — | — | — | — | — | NOT STARTED | Retest prior fixes first |

## Required GitHub issue content

- Title: [RED TEAM][SEVERITY][CONFIDENCE] concise root-cause title.
- Affected component and revision actually inspected.
- Exact source evidence or safe reproduction/test result.
- Preconditions, threat objective, and realistic impact.
- Safe local/staging reproduction steps using synthetic data.
- Minimal mitigation and regression test.
- Lifecycle state, first discovery worker, latest retest worker.
- Related issue/PR/commit/test links.

Redact all actual secrets and sensitive personal data.

## Red label convention

| Label | Suggested color | Use |
|---|---|---|
| security:red | #B60205 | Confirmed actionable security finding |
| security | #1D76DB | General security classification |
| severity:critical | #B60205 | Critical impact |
| severity:high | #D93F0B | High impact |
| severity:medium | #FBCA04 | Medium impact |
| severity:low | #0E8A16 | Low impact |

A GitHub integration can apply a label only if it exists or the available tools can create it. If label creation is unavailable, prefix the issue title with [RED TEAM][SEVERITY], report the missing label, and ask the owner to create it. Never claim the visual red label was applied until verified.

## Retest lifecycle

- OPEN — not fixed.
- FIX IN PROGRESS — a patch is being prepared.
- FIXED—AWAITING RETEST — patch and available checks exist but a later worker has not challenged it.
- RETEST PASSED — later worker attempted the documented bypasses and recorded test evidence.
- REOPENED — later worker found a bypass or regression.
- ACCEPTED RISK — only after explicit owner acceptance.
- BLOCKED — missing permission, code, environment, or test access.
- CLOSED — only after verification and actual authorized GitHub issue closure.

Never close an issue because a patch was merely proposed. The next worker must retest prior fixes first.
