# Dependencies

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.

---

## Principles

- Keep **runtime** dependencies minimal
- Prefer well-maintained official SDKs
- Lockfile (`package-lock.json`) is committed; use `npm ci` in CI
- Node engine: `>=24` (matches Lambda `nodejs24.x`)

---

## Current runtime

| Package             | Purpose             | Notes                          |
| ------------------- | ------------------- | ------------------------------ |
| `@anthropic-ai/sdk` | Claude Messages API | Keep on latest `0.x` when safe |

Dev tooling (TypeScript, Jest, ESLint, Prettier, Webpack, husky, commitlint) is allowed to grow carefully; still avoid unused plugins.

### Intentionally not on absolute latest

| Package      | Held at | Reason                                                       |
| ------------ | ------- | ------------------------------------------------------------ |
| `typescript` | 6.x     | `typescript-eslint` requires `<6.1`; `ts-jest` requires `<7` |

`@types/node` tracks the **Lambda runtime major** (`24.x`), not npm’s newest Node types line (`26.x`).

---

## Adding a dependency

1. Justify need in the PR (why not existing code?)
2. Prefer exact or caret ranges consistent with the repo
3. Run `npm install`, `make preflight`, `make security`, `make security-all`
4. Update this doc and `.env.example` if new env vars appear
5. Human review required for **runtime** additions

---

## Auditing

```bash
make security
make security-all
```

Production audit is the deploy gate; full audit (including devDependencies) is also required in CI.
