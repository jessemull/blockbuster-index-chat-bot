## Summary

<!-- What does this PR do? Why? -->

## Type

- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Test
- [ ] Docs / governance
- [ ] Chore (deps, CI, tooling)

## Checklist

### Required

- [ ] `make preflight` passes (lint + test + build)
- [ ] Tests added/updated for behavior changes
- [ ] No secrets committed

### Architecture / API

- [ ] Layering preserved (handler → services/utils)
- [ ] `api.yaml` updated if HTTP contract changed

### Security

- [ ] No full-event / message-body logging introduced
- [ ] CORS allowlist unchanged or intentionally reviewed

## Review Notes

<!-- Point reviewers at docs/REVIEW.md severity tiers. Focus areas? -->
