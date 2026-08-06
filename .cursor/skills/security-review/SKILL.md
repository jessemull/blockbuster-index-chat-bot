---
name: security-review
description: >-
  Security-focused review of secrets, logging, CORS, IAM, and dependency risk.
  Use when touching auth-adjacent config, CFN IAM, logging, or dependencies.
---

# Security Review

Read: `docs/SECURITY.md`, `docs/DEPENDENCIES.md`, `docs/REVIEW.md`.

## Focus

- Secrets in source, workflows, or logs
- Full-event / message-body logging
- CORS allowlist regressions (`*`)
- IAM / Lambda invoke ARN scope
- Input validation (message/history limits)
- Production dependency advisories (`make security`)

## Output

Same MUST / SHOULD / NICE sections as `pr-review`. Security MUST findings always block merge.
