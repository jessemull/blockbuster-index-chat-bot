---
name: push-validation
description: >-
  Final quality gate before pushing. Use when finishing a feature or before opening a PR.
---

# Push Validation

Read: `CONTEXT.md`, `AGENTS.md`, `docs/TESTING.md`, `docs/SECURITY.md`, `docs/CI_CD.md`.

## Run

```bash
make preflight
make security
```

## Checklist

- [ ] Preflight green (lint + test + build)
- [ ] Production audit green (`make security`)
- [ ] No secrets staged
- [ ] Docs updated if contracts/env/deploy changed
- [ ] Commits follow Conventional Commits

Do not push if MUST issues remain. Companion: `commit`, `pr-review`, `security-review`.
