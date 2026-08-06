---
name: testing
description: >-
  Write and maintain Jest tests for the chat bot.
  Use when adding coverage, fixing failing tests, or changing thresholds.
---

# Testing Skill

Read: `docs/TESTING.md`, `.cursor/rules/040-testing.mdc`.

## Guidance

- Arrange / Act / Assert
- Mock Anthropic; isolate handler HTTP behavior when needed
- Cover 400 / 502 / 500 paths for relevant changes
- Never lower coverage thresholds without a governance PR
- Run `make test` before finishing
