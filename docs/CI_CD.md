# CI/CD

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this file.
>
> **AI agents:** Read when modifying GitHub Actions workflows or deploy gates.

---

## Workflows

| Workflow           | Trigger             | Purpose                                                                                             |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------- |
| `pull-request.yml` | PR to `main`        | `make format`, `make preflight` (+ package), prod + full `npm audit`, commitlint, cfn-lint, OpenAPI |
| `merge.yml`        | Push to `main`      | Same quality gates, then deploy Lambda to **dev** via CloudFormation change set                     |
| `deploy.yml`       | `workflow_dispatch` | Same quality gates, then deploy to **dev** or **prod**                                              |
| `rollback.yml`     | `workflow_dispatch` | Redeploy prior S3 zip to chosen environment                                                         |

All use Node **20**, `actions/checkout@v4`, and `aws-actions/configure-aws-credentials@v4` where AWS is needed.

Branch protection on `main` (required status checks) is configured in GitHub settings, not in YAML.

---

## Required secrets (GitHub)

| Secret                                        | Used by                                 |
| --------------------------------------------- | --------------------------------------- |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | merge, deploy, rollback                 |
| `ANTHROPIC_API_KEY`                           | CloudFormation parameter for Lambda env |

OIDC is intentionally not used (cost/ops choice). Treat long-lived keys carefully.

---

## Quality bar

Local and CI use the same Make targets:

```bash
make format        # prettier --check
make preflight     # lint + test + build
make security      # npm audit --omit=dev --audit-level=high
make security-all  # npm audit --audit-level=high (includes devDeps)
make cfn-lint      # CloudFormation templates (requires cfn-lint on PATH)
make openapi       # validate api.yaml
make ci            # all of the above
```

PR CI also runs **commitlint** against the PR commit range (`wagoid/commitlint-github-action`).

Jest enforces 80% coverage thresholds; failing coverage fails `npm test` / `make preflight`.

---

## Deploy monitoring

Deploy/merge workflows treat `ROLLBACK_COMPLETE` / `UPDATE_ROLLBACK_COMPLETE` as **failure**, not success.

---

## Changing CI

- Prefer shared Make targets over copy-paste drift between workflows
- Keep Node version aligned with `engines` and Lambda runtime
- Human review required (`docs/GOVERNANCE.md`)
