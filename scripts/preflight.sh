#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> lint"
npm run lint

echo "==> test"
npm test

echo "==> build"
npm run build

echo "Preflight passed."
