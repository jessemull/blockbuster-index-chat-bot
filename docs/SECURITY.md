# Security

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > **SECURITY.md**.
>
> **AI agents:** Read when handling secrets, logging, CORS, IAM, or dependency audits.

---

## Secrets

- Never commit API keys, PEM paths with private keys, or `.env` files
- `.gitignore` ignores `.env` and `.env.*` (except `.env.example`)
- Lambda receives `ANTHROPIC_API_KEY` from CloudFormation parameter (`NoEcho: true`) — acceptable for this cost-conscious project; do not add Secrets Manager/OIDC unless product decides
- Bastion vars (`SSH_*`) documented in `.env.example` only

---

## Logging

- Log request metadata only: `requestId`, `method`, `path`, `origin`
- Never log full API Gateway events or chat message bodies
- Keep `console.error` available in production bundles (webpack `pure_funcs` strips log/info/debug only)

---

## Network / API

- Public chat API uses `AuthorizationType: NONE` by design (website chatbot)
- Abuse controls: API Gateway stage MethodSettings (5 rps / burst 10) + message/history limits
- CORS allowlist in `src/constants/cors.ts`; OPTIONS via Lambda proxy
- Do not set `Access-Control-Allow-Origin: *`

---

## IAM and infrastructure

- Execution role: CloudWatch Logs scoped to this function’s log group where possible
- Lambda invoke permissions: SourceArn scoped to imported API Gateway id
- S3 deployment bucket: SSE-S3 + block all public access

---

## Dependencies

- Prefer minimal runtime dependencies (currently `@anthropic-ai/sdk` only)
- `make security` audits **production** dependencies (`--omit=dev --audit-level=high`)
- `make security-all` audits **all** dependencies including devDeps (`--audit-level=high`)
- New runtime deps require human review (`docs/GOVERNANCE.md`, `docs/DEPENDENCIES.md`)

---

## Incident / vulnerability response

1. Rotate exposed keys immediately (Anthropic, AWS, SSH)
2. Remove secrets from git history if committed
3. Patch dependencies; re-run `make security` and `make preflight`
4. Document the fix in the PR description
