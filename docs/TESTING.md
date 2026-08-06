# Testing

> **Precedence:** CONTEXT.md > GOVERNANCE.md > ARCHITECTURE.md > this document.
>
> **AI agents:** Read when writing or changing tests, mocks, or coverage thresholds.

---

## Goals

Tests provide **documentation**, **confidence**, and **safety** for refactoring.

---

## Stack

- Jest + `ts-jest`
- Coverage reporters: json, lcov, text, clover
- Global threshold: **80%** branches, functions, lines, statements (`jest.config.js`)

---

## What to test

| Test                                                    | Don't test                                    |
| ------------------------------------------------------- | --------------------------------------------- |
| Handler methods and status codes                        | Third-party SDK internals                     |
| Validation (empty, whitespace, max length, bad history) | Trivial re-exports                            |
| Claude success, non-text, empty content, thrown errors  | Implementation trivia                         |
| History sanitize / limit / build / convert              | Exact log string formatting (unless contract) |
| CORS allowlist vs fallback                              |                                               |

---

## Conventions

- File names: `*.test.ts` next to or under the same area as the unit under test
- Prefer `describe` / `it("should ... when ...")`
- Arrange → Act → Assert
- Mock `@anthropic-ai/sdk` in Claude tests; mock services in handler tests when isolating HTTP behavior
- Suppress `console.error` in tests that expect logged errors, and restore after

---

## Commands

```bash
make test
# or
npm test
```

Open HTML coverage: `npm run coverage:open` (after a test run).

---

## Policy

- Behavior changes require test updates
- Do not lower coverage thresholds without a governance PR
- CI fails if Jest thresholds fail
