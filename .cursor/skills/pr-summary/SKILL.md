---
name: pr-summary
description: >-
  Draft a pull request summary from branch commits and diff.
  Use when opening or updating a PR.
---

# PR Summary

1. `git log origin/main..HEAD --oneline`
2. `git diff origin/main...HEAD --stat`
3. Draft Summary (1–3 bullets), Test plan checklist, notes for reviewers
4. Align with `.github/PULL_REQUEST_TEMPLATE.md`
5. Mention `make preflight` / relevant docs touched
