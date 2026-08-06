# Releases

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.

---

## Versioning

- Semver in `package.json` (`version` field)
- Deployed artifacts embed version + git short SHA + UTC timestamp in the S3 object name
- Lambda `$LATEST` is updated via CloudFormation; no alias traffic shifting in this project

---

## Cadence

- **Dev:** continuous via merge to `main`
- **Prod:** intentional manual deploy after verifying on dev

---

## Checklist before prod

- [ ] `make preflight` green on the commit being deployed
- [ ] Dev smoke: GET health + POST chat
- [ ] No MUST findings open (`docs/REVIEW.md`)
- [ ] Rollback zip name known (previous good artifact in S3)

---

## Changelogs

Prefer Conventional Commit history and PR summaries over a separate CHANGELOG unless releasing a tagged GitHub Release.
