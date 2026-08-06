# Start feature branch

Branch name: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask for a name (e.g. `feature/chat-rate-limit` or `fix/cors-origin`).

## 1. Load governance

Read in order: `CONTEXT.md`, `AGENTS.md`, then mandatory docs from CONTEXT.md.

## 2. Sync and branch

```bash
git fetch origin main
git checkout main
git pull origin main
git checkout -b $ARGUMENTS
```

## 3. Implement

Follow `docs/ARCHITECTURE.md` and `.cursor/skills/feature-development/SKILL.md`.

## 4. Validate

```bash
make preflight
```
