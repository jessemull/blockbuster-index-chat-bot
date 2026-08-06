---
name: commit
description: >-
  Prepare and create commits using Conventional Commits and repo hooks.
  Use when staging, committing, or preparing changes for a PR.
---

# Commit Changes

Read before committing: `CONTEXT.md`, `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/REVIEW.md`.

## Safety

- Only commit when the user explicitly requests it
- Never `--no-verify` unless the user explicitly asks
- Never amend pushed commits; never force-push `main`

## Steps

1. `git status` / `git diff` / `git log -5 --oneline`
2. Ensure `make preflight` passes for code changes
3. Stage relevant files (exclude `.env`, secrets)
4. Commit with Conventional Commits via HEREDOC:

```bash
git commit -m "$(cat <<'EOF'
type: short summary

Optional body explaining why.
EOF
)"
```

5. `git status` to verify

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `ci`.
