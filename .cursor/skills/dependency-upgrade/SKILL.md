---
name: dependency-upgrade
description: >-
  Upgrade npm dependencies safely with preflight and production audit.
  Use when bumping packages or responding to Dependabot.
---

# Dependency Upgrade

Read: `docs/DEPENDENCIES.md`, `docs/SECURITY.md`.

## Steps

1. Identify current vs target versions
2. Upgrade with npm; commit lockfile
3. `make preflight`
4. `make security`
5. Note breaking changes; runtime deps need human review per GOVERNANCE

Prefer minimal runtime surface. Do not add packages without justification.
