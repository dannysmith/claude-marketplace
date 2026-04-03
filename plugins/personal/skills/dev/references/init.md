# Init - Phase 2: AI Instructions

Phase 1 (the shell script) has already run. It handled directory creation, CLAUDE.md/AGENTS.md
migration, gitkeeps, and template copying. Its output indicates what was created vs what already
existed.

## What to do now

Check the shell script output for `CREATED_AGENTS=true` and `CREATED_README=true`.

### If AGENTS.md was created from template

No further action needed for AGENTS.md — the template includes task management documentation
and placeholder sections. Remind the user to fill in the Overview & Development
sections as the project takes shape.

### If AGENTS.md already existed (migrated or pre-existing)

Check whether AGENTS.md already contains a task management section like the "Task Management" section of `${CLAUDE_SKILL_DIR}/assets/AGENTS.templ.md`. Update accordingly.

If the project had pre-existing files (ie not a fresh directory), briefly review what exists and
suggest sensible additions to AGENTS.md and/or README.md. Present suggestions to the user rather
than making changes.

### Report

Tell the user what was set up:
- Directories & files created, changed or skipped
- Changes to CLAUDE.md/AGENTS.md/README.md
- Whether `devtask-complete` was found on PATH
- Any other changes made and any STRONG recmendations for changes the user should make
- If the project directory is not part of a Git repo, offer to run `git init && git add . && git commit -m "Initial Commit"`.
