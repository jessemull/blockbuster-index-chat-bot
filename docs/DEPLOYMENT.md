# Deployment

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.
>
> Companion: `docs/ENVIRONMENTS.md`, `docs/CI_CD.md`.

---

## Scope

| Target             | Mechanism                                 |
| ------------------ | ----------------------------------------- |
| Dev Lambda         | Automatic on push to `main` (`merge.yml`) |
| Dev or Prod Lambda | Manual Actions workflow `Deploy`          |
| Prior artifact     | Manual Actions workflow `Rollback`        |

API Gateway / role / S3 stacks are updated separately when those templates change (not every Lambda zip deploy).

---

## Lambda package flow

1. `npm ci` → lint → test → webpack build → zip (`make package` / `npm run package`)
2. Upload to `s3://blockbuster-index-chat-bot-${env}/blockbuster-index-chat-bot/<artifact>.zip`
3. CloudFormation change set on `template.yaml` with `S3Key` + `Environment` + `AnthropicApiKey`
4. Execute change set if changes exist; monitor stack status
5. Prune old zips (keep last 5)

Artifact name pattern:

`blockbuster-index-chat-bot-<version>-<gitsha>-<timestamp>.zip`

---

## Manual deploy

1. GitHub → Actions → **Deploy**
2. Choose `dev` or `prod`
3. Confirm lint/test/build succeed and stack reaches `CREATE_COMPLETE` or `UPDATE_COMPLETE`

---

## Rollback

1. Actions → **Rollback**
2. Provide existing S3 zip file name under the env bucket prefix
3. Choose environment
4. Confirm stack update succeeds

---

## Template map

| File                                                  | When to change                                      |
| ----------------------------------------------------- | --------------------------------------------------- |
| `template.yaml`                                       | Lambda code packaging, env vars, invoke permissions |
| `cloudformation/blockbuster-index-chat-bot-api.yaml`  | Routes, models, stage throttle, domain, OPTIONS     |
| `cloudformation/blockbuster-index-chat-bot-role.yaml` | IAM                                                 |
| `cloudformation/blockbuster-index-chat-bot-s3.yaml`   | Artifact bucket policy/encryption                   |

Bump `DeploymentNonce` on the API stack when method/model changes need a forced API Gateway redeployment.

---

## Local verify before deploy

```bash
make preflight
make security
```
