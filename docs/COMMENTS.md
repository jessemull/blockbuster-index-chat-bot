# Comments

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.

---

## Policy

Code should explain **what** it does. Comments should explain **why** it exists when that is not obvious.

### Allowed

- Architectural or security intent
- Non-obvious business/domain rules
- Workarounds and constraints (with context)
- Justification for unusual TypeScript assertions

### Disallowed

- Narrating the next line (`// handle POST`)
- Commented-out dead code
- Redundant JSDoc that restates the signature

---

## Spacing (TypeScript)

- Standalone comments: blank line above and below (except at start/end of a block)
- Prefer short comments over essay paragraphs

---

## Alphabetization note

When adding lists of imports or object keys where order is irrelevant, prefer alphabetical order for consistency (see `AGENTS.md`).
