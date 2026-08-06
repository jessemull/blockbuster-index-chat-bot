# Architecture

> **Precedence:** CONTEXT.md > GOVERNANCE.md > **ARCHITECTURE.md** > feature docs > inline comments.
>
> **AI agents — read this file when:** creating files, deciding where code belongs, changing request flow, or modifying CloudFormation layout.

---

## System overview

Public HTTP API → API Gateway (regional, custom domain) → Lambda (`src/handler.ts`) → Anthropic Claude.

Conversation history is **client-managed** and returned on each response (stateless Lambda).

```
Client
  │
  ▼
API Gateway (/api/chat) ── stage throttle 5 rps / burst 10
  │
  ▼
Lambda handler
  ├── CORS allowlist
  ├── validate message + history
  ├── services/claude (Anthropic)
  └── services/history (sanitize / build / convert)
```

---

## Application layers

| Layer     | Path             | Responsibility                                       |
| --------- | ---------------- | ---------------------------------------------------- |
| Entry     | `src/handler.ts` | HTTP methods, validation, status codes, CORS headers |
| Services  | `src/services/`  | Claude API, history sanitize/limit/build             |
| Utils     | `src/utils/`     | Pure helpers (CORS header construction)              |
| Constants | `src/constants/` | Limits, model, origins, system prompt                |
| Types     | `src/types/`     | `ChatRequest`, `ChatResponse`, `ChatMessage`, etc.   |

**Dependency direction:** handler → services/utils/constants/types. Services must not import the handler.

---

## HTTP contract

| Method  | Path        | Behavior                                  |
| ------- | ----------- | ----------------------------------------- |
| GET     | `/api/chat` | Health check                              |
| POST    | `/api/chat` | Chat (message required; history optional) |
| OPTIONS | `/api/chat` | CORS preflight (Lambda proxy)             |

Status codes: `200` success, `400` validation, `405` method, `502` Claude upstream, `500` unexpected.

---

## Infrastructure layout

| Template                                              | Resources                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| `template.yaml`                                       | Lambda function, invoke permissions (GET/POST/OPTIONS)                          |
| `cloudformation/blockbuster-index-chat-bot-api.yaml`  | Rest API, models, stage + MethodSettings, custom domain, usage plan scaffolding |
| `cloudformation/blockbuster-index-chat-bot-role.yaml` | Execution role (scoped CloudWatch Logs)                                         |
| `cloudformation/blockbuster-index-chat-bot-s3.yaml`   | Deployment bucket (SSE-S3, public access blocked)                               |

Cross-stack references use CloudFormation exports/imports (bucket name, role ARN, API id).

---

## Key invariants

- History is sanitized and truncated **before** Claude is called
- `MAX_MESSAGE_LENGTH = 2000`, `MAX_HISTORY_LENGTH = 5`
- Production webpack strips `console.log`/`info`/`debug` but keeps `console.error`
- API Gateway OPTIONS uses AWS_PROXY so CORS matches the Lambda allowlist
