# Blockbuster Index Chat Bot — developer commands.
# See AGENTS.md and CONTEXT.md for governance.

.DEFAULT_GOAL := help

.PHONY: help install lint format format-fix test security build package preflight \
	validate-env bastion clean

help: ## Help@show targets
	@printf 'Blockbuster Index Chat Bot — make <target>\n\n'
	@grep -E '^[a-zA-Z0-9_-]+:.* ## ' Makefile \
		| grep -v '^help:' \
		| awk 'BEGIN {FS = ":.* ## "} \
		{ split($$2, p, "@"); \
		  if (p[1] != g) { if (g != "") print ""; printf "%s\n", p[1]; g = p[1] } \
		  printf "  %-20s %s\n", $$1, p[2] }'

install: ## Setup@npm ci
	npm ci

lint: ## Quality@eslint
	npm run lint

format: ## Quality@prettier check
	npm run format:check

format-fix: ## Quality@prettier write
	npm run format

test: ## Quality@jest with coverage
	npm test

security: ## Quality@production npm audit (high+)
	npm audit --omit=dev --audit-level=high

build: ## Quality@webpack production bundle
	npm run build

package: ## Quality@zip Lambda artifact
	npm run package

preflight: ## Quality@lint + test + build
	./scripts/preflight.sh

validate-env: ## Utilities@check bastion SSH env vars
	node ./scripts/validate-env.js

bastion: ## Utilities@ssh via scripts/connect.js
	npm run bastion

clean: ## Utilities@remove dist/
	npm run clean
