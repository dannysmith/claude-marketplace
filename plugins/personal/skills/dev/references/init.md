# Init - Phase 2: AI Instructions

Phase 1 (the shell script) has already run. It handled directory creation (including the
gitignored `docs/tasks-todo/temporary/`), CLAUDE.md/AGENTS.md migration, gitkeeps, and template
copying. Its output indicates what was created vs what already existed.

## What to do now

Check the shell script output for `CREATED_AGENTS=true` and `CREATED_README=true`.

### If AGENTS.md was created from template

No further action needed for AGENTS.md — the template includes task management documentation
and placeholder sections. Remind the user to fill in the Overview & Development
sections as the project takes shape.

### If AGENTS.md already existed (migrated or pre-existing)

Check whether AGENTS.md already contains a "Task Management" section matching the one in `assets/AGENTS.templ.md`. Add it if missing. If there is an older or longer version describing a different filename format, replace it with the template's version.

If the project had pre-existing files (ie not a fresh directory), briefly review what exists and
suggest sensible additions to AGENTS.md and/or README.md. Present suggestions to the user rather
than making changes.

### If this is a web project

Applies only when the project serves pages from a local dev server (Astro, Vite, Next, SvelteKit, a static site with a dev server etc) and has a `package.json`. Skip this section entirely for anything else (CLIs, libraries, APIs, non-code projects).

If `package.json` has no `shoot` script, offer to add a screenshot command so agents can see what they have built. Do not add it without the user's agreement. If they agree:

1. Copy `assets/shoot.mjs` to `scripts/shoot.mjs` in the project.
2. Set `DEFAULT_BASE` in the copy to the project's dev server URL, and change `bun run` in its usage comments if the project uses another package manager.
3. Add `"shoot": "node scripts/shoot.mjs"` to the `scripts` in `package.json`.
4. Add `playwright` as a dev dependency with the project's package manager, unless it is already there, and tell the user to run `playwright install chromium` through that package manager if they have not used Playwright on this machine.
5. Add this section to AGENTS.md, adjusted for the package manager:

```markdown
## Screenshots

`bun run shoot [path]` takes full-page screenshots of a page at a spread of widths, in light and dark mode, and writes them to `docs/tasks-todo/temporary/`. Use it to check visual work. It needs the dev server running. Flags: `--widths=<csv>`, `--theme=light|dark|both`, `--out=<dir>`, `--base=<url>`.
```

### Report

Tell the user what was set up:
- Directories & files created, changed or skipped
- Changes to CLAUDE.md/AGENTS.md/README.md/.gitignore
- Whether `devtask-complete` was found on PATH
- Whether the screenshot command was added, declined or not relevant
- Any other changes made and any STRONG recommendations for changes the user should make
- If the project directory is not part of a Git repo, offer to run `git init && git add . && git commit -m "Initial Commit"`.
