# CI/CD

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this file.
>
> **AI agents:** Read when modifying GitHub Actions workflows or deploy gates.

---

## Workflows

| Workflow           | Trigger             | Purpose                                                     |
| ------------------ | ------------------- | ----------------------------------------------------------- |
| `pull-request.yml` | PR to `main`        | Build, lint, test, coverage artifact, prod dependency audit |
| `merge.yml`        | Push to `main`      | Deploy Lambda to **dev** via CloudFormation change set      |
| `deploy.yml`       | `workflow_dispatch` | Deploy to **dev** or **prod**                               |
| `rollback.yml`     | `workflow_dispatch` | Redeploy prior S3 zip to chosen environment                 |

All use Node **20**, `actions/checkout@v4`, and `aws-actions/configure-aws-credentials@v4` where AWS is needed.

---

## Required secrets (GitHub)

| Secret                                        | Used by                                 |
| --------------------------------------------- | --------------------------------------- |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | merge, deploy, rollback                 |
| `ANTHROPIC_API_KEY`                           | CloudFormation parameter for Lambda env |

OIDC is intentionally not used (cost/ops choice). Treat long-lived keys carefully.

---

## Quality bar

Local and CI should agree:

```bash
make preflight   # lint + test + build
make security    # npm audit --omit=dev --audit-level=high
```

Jest enforces 80% coverage thresholds; failing coverage fails `npm test`.

---

## Deploy monitoring

Deploy/merge workflows treat `ROLLBACK_COMPLETE` / `UPDATE_ROLLBACK_COMPLETE` as **failure**, not success.

---

## Changing CI

- Prefer shared steps over copy-paste drift between `merge.yml` and `deploy.yml`
- Keep Node version aligned with `engines` and Lambda runtime
- Human review required (`docs/GOVERNANCE.md`)
