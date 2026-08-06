---
name: repo-review
description: >-
  Full-repository quality audit with the same severity tiers as pr-review.
  Use for release readiness or post-migration validation.
---

# Repository Review

**Severity:** `docs/REVIEW.md`. **Output shape:** same as `.cursor/skills/pr-review/SKILL.md`.

## Scope

Review the entire repo against governance (CONTEXT → AGENTS → docs), not a single PR.

## Steps

1. Read full mandatory docs from CONTEXT.md
2. Enumerate `src/`, `cloudformation/`, workflows, docs, Cursor governance
3. Prioritize correctness → architecture → security → maintainability
4. Output Verdict (`Ready` / `Needs work`) + MUST / SHOULD / NICE TO HAVE
5. Note coverage/threshold drift under SHOULD if relevant
