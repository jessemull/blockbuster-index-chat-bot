# Environments

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.

---

## Overview

| Component      | Development (`dev`)                | Production (`prod`)               |
| -------------- | ---------------------------------- | --------------------------------- |
| Custom domain  | `api-dev.blockbusterindex.com`     | `api.blockbusterindex.com`        |
| Lambda         | `blockbuster-index-chat-bot-dev`   | `blockbuster-index-chat-bot-prod` |
| S3 artifacts   | `blockbuster-index-chat-bot-dev`   | `blockbuster-index-chat-bot-prod` |
| Stage throttle | 5 rps / burst 10                   | Same                              |
| Auto-deploy    | Push/merge to `main` → `merge.yml` | Manual `deploy.yml` with `prod`   |

---

## CORS allowlist

Defined in `src/constants/cors.ts`:

- `https://www.blockbusterindex.com`
- `https://www.dev.blockbusterindex.com`
- `http://localhost:3000`

---

## Lambda environment variables

| Variable            | Source                        | Notes                |
| ------------------- | ----------------------------- | -------------------- |
| `ENVIRONMENT`       | CloudFormation `Environment`  | `dev` or `prod`      |
| `ANTHROPIC_API_KEY` | CFN parameter / GitHub secret | `NoEcho` in template |

---

## Local developer env

| Variable               | Purpose      |
| ---------------------- | ------------ |
| `SSH_HOST`             | Bastion host |
| `SSH_USER`             | SSH user     |
| `SSH_PRIVATE_KEY_PATH` | Path to PEM  |

See `.env.example`. Validate with `make validate-env`.

---

## Stack naming

- Lambda stack: `blockbuster-index-chat-bot-stack-${Environment}`
- Change sets: `blockbuster-index-chat-bot-change-set-${Environment}`
- API / role / S3 stacks are separate CloudFormation stacks with exported names
