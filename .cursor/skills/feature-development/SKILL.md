---
name: feature-development
description: >-
  Implement features for the Lambda chat bot following architecture and quality gates.
  Use when adding endpoints, services, validation, or infra related to chat behavior.
---

# Feature Development

Read before implementing: `CONTEXT.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/SECURITY.md`, `docs/REVIEW.md`.

## Workflow

1. Confirm placement (handler vs service vs constants vs CFN)
2. Implement with validation and tests
3. Update `api.yaml` / docs if contract changes
4. `make preflight`
5. Use `commit` / `push-validation` / `pr-summary` as needed

## MUST

- Preserve layering and status-code contracts
- Add tests for new behavior
- Avoid secrets and verbose logging
