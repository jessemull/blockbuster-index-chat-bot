# PR Review Framework

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > **REVIEW.md** > inline comments.
>
> **AI agents — read this file when:** reviewing a PR, writing review comments, or deciding merge blockers.

---

## Severity tiers

Every review comment must be tagged with a severity tier.

### MUST (blocking)

- Architecture violations (wrong layer, Anthropic calls in handler)
- Security issues (secrets in repo, PII/message logging, CORS `*`)
- Correctness bugs (wrong status codes, missing validation)
- Claude errors returned as HTTP 200
- Governance non-negotiable violations
- Missing tests for behavior changes; coverage below 80%
- Broken `make preflight`

### SHOULD (significant)

- Missing edge-case tests
- Overly broad IAM or invoke permissions
- Docs out of sync with code (`api.yaml`, README, ENVIRONMENTS)
- Unclear error messages
- Large unrelated changes in one PR

### NICE TO HAVE (non-blocking)

- Naming polish
- Minor style beyond linters
- Extra documentation clarity
- Equivalent alternative implementations

---

## PR hygiene

- [ ] Description follows the PR template (What / Why / Testing)
- [ ] Single logical change; Conventional Commits
- [ ] No unrelated drive-by changes
- [ ] Prefer &lt; 400 lines changed unless justified

---

## Architecture checklist

- [ ] handler → services/utils/constants/types only
- [ ] No SDK usage outside `services/claude.ts`
- [ ] History sanitized before Claude
- [ ] New files in the correct folder

---

## API / behavior checklist

- [ ] Message required + max length enforced
- [ ] Invalid history rejected with 400
- [ ] Claude `error` → 502
- [ ] OPTIONS returns allowlisted CORS headers
- [ ] `api.yaml` updated if contract changed

---

## Security checklist

- [ ] No secrets committed
- [ ] No full event / message body logs
- [ ] CORS allowlist unchanged or intentionally reviewed
- [ ] IAM / SourceArn changes justified

---

## Testing checklist

- [ ] Happy and sad paths covered
- [ ] Mocks for Anthropic
- [ ] `make test` passes; coverage thresholds hold

---

## Infra / CI checklist

- [ ] CloudFormation changes reviewed (stage throttle, encryption, permissions)
- [ ] Workflows still use Node 20 and modern actions
- [ ] Rollback statuses treated as failure where applicable

---

## Output format for agent reviews

Use fixed sections. Prefer one imperative bullet per finding with `` `path:line` — task ``.

```markdown
## Verdict

Ready to merge | Needs work

## MUST

- (no items) | `file:line` — task

## SHOULD

- (no items) | `file:line` — task

## NICE TO HAVE

- (no items) | `file:line` — task
```

Do not paste entire checklist tables into the review output.
