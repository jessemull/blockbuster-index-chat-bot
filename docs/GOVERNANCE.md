# Governance

> **Precedence:** CONTEXT.md > **GOVERNANCE.md** > ARCHITECTURE.md > feature docs > inline comments.
>
> **AI agents — read this file when:** making structural decisions, resolving conflicting guidance, determining what requires human review, or proposing changes to governance docs.

---

## Source-of-truth precedence

| Rank | Document           | Scope                                           |
| ---- | ------------------ | ----------------------------------------------- |
| 1    | `CONTEXT.md`       | Project identity and non-negotiable constraints |
| 2    | `GOVERNANCE.md`    | Process, authority, enforcement                 |
| 3    | `ARCHITECTURE.md`  | Structure and dependency rules                  |
| 4    | Feature / ops docs | Domain-specific guidance                        |
| 5    | Inline comments    | Local intent                                    |

Resolve conflicts upward, never downward.

---

## Non-negotiable constraints

- TypeScript strict mode on
- No secrets committed; `.env` gitignored
- Handler does not call Anthropic directly
- Message ≤ 2000 chars; history ≤ 5 validated messages
- Claude failures → HTTP 502
- No full-event / message-body logging
- CORS allowlist only (no `*`)
- Coverage ≥ 80%; `make preflight` before merge

---

## Decision authority

### Autonomous (no special review)

- Bug fixes that do not change public API contracts
- Adding or updating tests
- Docs within existing files
- Formatting / lint fixes
- Internal refactors that preserve handler/service boundaries

### Requires human review

- Changes to governance docs (`CONTEXT.md`, this file, `ARCHITECTURE.md`, `REVIEW.md`, etc.)
- New third-party runtime dependencies
- CI/CD workflow changes
- CloudFormation security-sensitive changes (IAM, public access, auth)
- Public API contract changes (`api.yaml`, request/response shapes)
- Lowering coverage thresholds or removing tests
- CORS allowlist changes

### Requires explicit product decision

- Changing bot personality / system prompt in a material way
- Adding authentication requirements to the public chat API
- New paid AWS services (Secrets Manager, etc.)

---

## Change process for governance docs

1. Open a PR; title should include `[governance]` when applicable
2. Explain why, what changed, and previous guidance
3. Human review required
4. Cascade updates to lower-ranked docs in the same or linked PR

---

## Enforcement

| Mechanism           | Checks                                                   | Blocks?                    |
| ------------------- | -------------------------------------------------------- | -------------------------- |
| husky + lint-staged | eslint/prettier on staged files                          | Commit                     |
| commitlint          | Conventional Commits                                     | Commit                     |
| husky `pre-push`    | `make preflight`                                         | Push                       |
| `make preflight`    | lint + test + build                                      | Local / expected before PR |
| `make ci`           | format + preflight + audits + cfn-lint + openapi         | Local full bar             |
| PR CI               | format, preflight, audits, commitlint, cfn-lint, OpenAPI | Merge                      |
| Deploy workflows    | format, preflight, audits, CloudFormation                | Deploy                     |

---

## Related

- Contribution workflow: `docs/CONTRIBUTING.md`
- Review tiers: `docs/REVIEW.md`
- CI details: `docs/CI_CD.md`
