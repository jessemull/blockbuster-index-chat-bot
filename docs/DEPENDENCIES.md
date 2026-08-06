# Dependencies

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.

---

## Principles

- Keep **runtime** dependencies minimal
- Prefer well-maintained official SDKs
- Lockfile (`package-lock.json`) is committed; use `npm ci` in CI
- Node engine: `>=20` (matches Lambda `nodejs20.x`)

---

## Current runtime

| Package             | Purpose             |
| ------------------- | ------------------- |
| `@anthropic-ai/sdk` | Claude Messages API |

Dev tooling (TypeScript, Jest, ESLint, Prettier, Webpack, husky, commitlint) is allowed to grow carefully; still avoid unused plugins.

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
# npm audit --omit=dev --audit-level=high
```

Full `npm audit` (including devDependencies) may report high issues in the toolchain; production audit is the merge gate.
