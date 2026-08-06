# AGENTS.md — Blockbuster Index Chat Bot

> Complete development rules for AI agents and human contributors.
> Entry point for loading order is `CONTEXT.md`.

---

## Repository Overview

| Field            | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| **Project**      | Blockbuster Index Chat Bot (“Tapey”)                            |
| **Architecture** | Single AWS Lambda behind API Gateway                            |
| **Runtime**      | Node.js 20, TypeScript (strict)                                 |
| **LLM**          | Anthropic Claude 3 Haiku via `@anthropic-ai/sdk`                |
| **CI/CD**        | GitHub Actions + CloudFormation                                 |
| **Git hooks**    | husky (pre-commit, commit-msg, pre-push) + Conventional Commits |

### Structure

```
blockbuster-index-chat-bot/
├── CONTEXT.md                 # Primary AI entry point
├── AGENTS.md                  # This file
├── CLAUDE.md / GEMINI.md      # Agent redirects
├── docs/                      # Governance and ops docs
├── .cursor/rules/             # Cursor rules
├── .cursor/skills/            # Cursor skills
├── .cursor/commands/          # Cursor slash commands
├── src/
│   ├── handler.ts             # Lambda entry / HTTP routing
│   ├── services/              # Claude + history
│   ├── constants/             # Models, CORS, prompts, limits
│   ├── types/                 # Request/response interfaces
│   └── utils/                 # CORS helpers
├── cloudformation/            # API, role, S3 stacks
├── template.yaml              # Lambda stack
├── .github/workflows/         # PR, merge, deploy, rollback
├── scripts/                   # bastion + validate-env + preflight
├── Makefile                   # Developer / agent commands
└── api.yaml                   # OpenAPI description
```

---

## Development Commands

Run **`make`** or **`make help`** for the full list.

| Command                           | Description                                          |
| --------------------------------- | ---------------------------------------------------- |
| `make install`                    | `npm ci`                                             |
| `make lint`                       | ESLint                                               |
| `make format` / `make format-fix` | Prettier check / write                               |
| `make test`                       | Jest with coverage                                   |
| `make security`                   | Production dependency audit (`npm audit --omit=dev`) |
| `make security-all`               | Full dependency audit including devDeps              |
| `make build`                      | Webpack production bundle                            |
| `make package`                    | Zip Lambda artifact                                  |
| `make preflight`                  | lint + test + build                                  |
| `make cfn-lint`                   | CloudFormation lint (requires `cfn-lint` on PATH)    |
| `make openapi`                    | Validate `api.yaml`                                  |
| `make ci`                         | format + preflight + audits + cfn-lint + openapi     |
| `make validate-env`               | Check bastion SSH env vars                           |
| `make bastion`                    | SSH via `scripts/connect.js`                         |
| `make clean`                      | Remove `dist/`                                       |

---

## Language and Style

### TypeScript

- Keep `strict: true`
- Prefer `interface` for object shapes in `src/types/`
- Named exports only from modules
- Explicit return types on exported functions when non-obvious

### Alphabetization (when order does not matter)

- Imports: external packages, then relative; sort members alphabetically
- Object / interface keys alphabetically when practical
- Union members alphabetically when practical

### Comments

- Prefer self-explanatory code
- Comments explain **why**, not what
- Follow `docs/COMMENTS.md`

### Error handling

- Validate inputs in the handler (JSON, empty message, max length, history)
- Claude failures: service returns `{ message, error }`; handler responds **502**
- Unexpected errors: **500** with generic body; log via `console.error`

---

## Architecture Rules

### Layering

```
handler → services (claude, history)
       → utils (cors)
       → constants / types
```

- **handler**: HTTP method routing, validation, response shaping, CORS headers
- **services/claude**: Anthropic API only
- **services/history**: history sanitize/limit/build/convert
- **utils**: pure helpers (CORS)
- **constants**: config and prompts (no I/O)

### Forbidden

- Calling Anthropic from the handler directly
- Logging full events or user message bodies
- Returning Claude errors as HTTP 200
- Committing `.env`, `coverage/`, or `dist/`
- Expanding CORS to `*`

---

## Testing Philosophy

Tests should provide **documentation**, **confidence**, and **safety**.

- Cover happy path, validation failures, and Claude error → 502
- Mock `@anthropic-ai/sdk` and keep tests fast/isolated
- Do not test framework internals or trivial pass-throughs
- Maintain ≥ 80% coverage (Jest `coverageThreshold`)

See `docs/TESTING.md`.

---

## Git Conventions

- Branch: `feature/...`, `fix/...`, `chore/...`
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`)
- Keep PRs focused; use `.github/PULL_REQUEST_TEMPLATE.md`
- Review with severity tiers in `docs/REVIEW.md`
- Push runs `make preflight` via husky (`HUSKY=0 git push` only if the user explicitly allows skipping hooks)

---

## When Writing Code

1. Read `CONTEXT.md` loading order
2. Check for existing patterns before adding files
3. Keep functions small and testable
4. Add/update tests for behavior changes
5. Update docs when env vars, API contracts, or deploy steps change
6. Run `make preflight` before pushing
