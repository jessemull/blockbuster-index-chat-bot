# Merge / sync main

Keep the current feature branch up to date with `main`.

```bash
git fetch origin main
git checkout <feature-branch>
git merge origin/main
# or: git rebase origin/main  (only if the user wants rebase)
make preflight
```

Resolve conflicts respecting `docs/ARCHITECTURE.md` and governance precedence. Do not force-push `main`.
