# Contributing

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > **CONTRIBUTING.md**.

---

## Getting started

```bash
git clone https://github.com/jessemull/blockbuster-index-chat-bot.git
cd blockbuster-index-chat-bot
make install
cp .env.example .env   # bastion only, if needed
make preflight
```

Read `CONTEXT.md` then `AGENTS.md` before substantial changes.

---

## Branch workflow

1. Sync `main`
2. Create `feature/...`, `fix/...`, or `chore/...`
3. Implement with tests
4. `make preflight`
5. Open PR using the GitHub template
6. Address MUST findings from `docs/REVIEW.md`

Cursor command: `.cursor/commands/start-feature.md`

---

## Commits

- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`)
- husky **pre-commit**: lint-staged; **commit-msg**: commitlint; **pre-push**: `make preflight`
- Do not use `--no-verify` unless explicitly requested

---

## Pull requests

- Fill `.github/PULL_REQUEST_TEMPLATE.md`
- Link `docs/REVIEW.md` for reviewers/agents
- Keep scope focused

---

## Local bastion (optional)

```bash
make validate-env
make bastion
```

Requires `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY_PATH` in `.env`.
