---
name: pr-review
description: >-
  Review pull requests with MUST/SHOULD/NICE severity. Diff-first, fixed-section output.
  Use when reviewing a PR or branch.
---

# PR Review

**Severity definitions:** `docs/REVIEW.md`.

## Principles

1. Diff-first
2. Risk-scoped depth (deep for security, IAM, API contract, CFN)
3. One bullet = one fixable task: `` `file:line` — task ``
4. Never paste full checklist tables into the output
5. Always render all sections; use `(no items)` when empty

## Steps

1. `git fetch origin main` and diff against merge base
2. Skim `CONTEXT.md` + `AGENTS.md`; load domain docs only as the diff requires
3. Walk `docs/REVIEW.md` internally
4. Output:

```markdown
## Verdict

Ready to merge | Needs work

## MUST

- (no items)

## SHOULD

- (no items)

## NICE TO HAVE

- (no items)
```
