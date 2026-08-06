# CONTEXT.md — Blockbuster Index Chat Bot

> **This is the PRIMARY entry point for ALL AI agents working in this repository.**
> Read this file first. Follow the mandatory reading order below before making any changes.

---

## Mandatory Reading Order

Every agent MUST read the following documents **in order** before making any change:

1. **`CONTEXT.md`** (this file) — loading order, source-of-truth precedence, non-negotiable constraints, quality gates
2. **`AGENTS.md`** — development rules, architecture constraints, coding standards, and forbidden patterns
3. **`docs/GOVERNANCE.md`** — contribution workflow, review policy, decision authority
4. **`docs/ARCHITECTURE.md`** — system design, module boundaries, request flow
5. **`docs/TESTING.md`** — testing strategy and coverage requirements
6. **`docs/COMMENTS.md`** — comment policy
7. **`docs/DEPENDENCIES.md`** — dependency management
8. **`docs/SECURITY.md`** — security policy and secret handling
9. **`docs/CI_CD.md`** — GitHub Actions and deploy/rollback workflows
10. **`docs/ENVIRONMENTS.md`** — dev vs prod configuration
11. **`docs/DEPLOYMENT.md`** — how to deploy and roll back
12. **`docs/REVIEW.md`** — PR review severity tiers and checklists (when reviewing)

Do not skip docs because the work “seems unrelated.”

---

## Source-of-Truth Precedence

When instructions conflict, the **higher-ranked source wins**:

| Priority    | Source                                                                    | Scope                                         |
| ----------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| 1 (highest) | `CONTEXT.md`                                                              | Repository-wide constraints and quality gates |
| 2           | `docs/GOVERNANCE.md`                                                      | Contribution workflow and review policy       |
| 3           | `docs/ARCHITECTURE.md`                                                    | System design and module boundaries           |
| 4           | Feature / ops docs (`TESTING.md`, `SECURITY.md`, `ENVIRONMENTS.md`, etc.) | Domain guidance                               |
| 5 (lowest)  | Inline code comments                                                      | Local implementation notes                    |

Lower-precedence instructions MUST NOT contradict higher-precedence instructions. If a conflict is detected, flag it for human review and follow the higher-precedence source.

---

## Non-Negotiable Constraints

These apply to **every** change. No exceptions without explicit human approval.

### Language and type safety

- TypeScript **`strict: true`** remains enabled
- No unjustified `any`; prefer typed interfaces in `src/types/`
- Prefer named exports

### Architecture

- Keep layering: `handler` → `services` / `utils` / `constants` / `types`
- Do not put Anthropic SDK calls or history logic in the handler beyond orchestration
- CloudFormation stays split: Lambda (`template.yaml`), API, role, S3 under `cloudformation/`

### API and product behavior

- Message max length: **2000** characters (`MAX_MESSAGE_LENGTH`)
- History: max **5** messages; validate role/content before calling Claude
- Claude upstream failures return **HTTP 502** (not 200 with a fake success)
- CORS uses the allowlist in `src/constants/cors.ts` (OPTIONS proxied through Lambda)

### Security

- No secrets in source control (`.env` is gitignored; use `.env.example` for bastion vars only)
- Do not log full API Gateway events or message bodies — request metadata only
- Keep Anthropic key out of logs and client responses

### Testing and quality

- Jest coverage thresholds stay at **80%** global minimum
- `make preflight` (lint + test + build) must pass before merge
- Conventional Commits enforced via commitlint / husky

---

## Mandatory Quality Gates

| When               | Gate                                                              | Failure policy        |
| ------------------ | ----------------------------------------------------------------- | --------------------- |
| **Commit**         | husky + lint-staged (eslint/prettier on staged files); commitlint | Block commit          |
| **Push**           | husky `pre-push` → `make preflight` (lint + test + build)         | Block push            |
| **Local / pre-PR** | `make preflight` (also run manually anytime)                      | Fix before opening PR |
| **PR CI**          | lint, test, build, production `npm audit`                         | Block merge           |
| **Deploy**         | lint, test, build, CloudFormation change set                      | Block deploy          |

---

## Confirmation Requirement

Before making changes, confirm you have loaded:

- [ ] `CONTEXT.md`
- [ ] `AGENTS.md`
- [ ] `docs/GOVERNANCE.md`
- [ ] `docs/ARCHITECTURE.md`
- [ ] Remaining mandatory docs listed above as needed for the task

If a listed doc is missing, note it and treat `CONTEXT.md` + `AGENTS.md` as authoritative until restored.
