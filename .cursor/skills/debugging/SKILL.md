---
name: debugging
description: >-
  Debug Lambda chat failures: validation, CORS, Claude 502s, and deploy issues.
  Use when investigating errors or unexpected API responses.
---

# Debugging

## Local

1. Reproduce with Jest when possible
2. Check handler validation vs Claude service vs CORS
3. Confirm webpack keeps `console.error` for prod diagnosis

## Deployed

1. CloudWatch logs for the env’s function (metadata + errors only by design)
2. API Gateway stage throttle / 4xx vs 5xx
3. Confirm Anthropic key present on Lambda env
4. Recent change set / rollback artifact

Do not add full-event logging as a permanent fix. Prefer targeted metadata.
