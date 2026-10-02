---
name: dev
description: >-
  This skill should be used when the user invokes "/personal:dev" with a subcommand.
  Subcommands: init (project + task setup), new (create task from description or GH issue),
  complete (finish a task), renumber (reorder task priorities), prime (load project context).
argument-hint: <init|new|complete|renumber|prime> [args]
disable-model-invocation: true
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# Dev Utilities

Project development utilities for initialisation, task management, and context priming.
Designed for any dev project. Tasks are tracked as markdown files: todo tasks in
`docs/tasks-todo/task-NUMBER-name.md`, completed tasks in
`docs/tasks-done/task-YYYY-MM-DD-NUMBER-name.md`. The gitignored
`docs/tasks-todo/temporary/` holds working files. If this project has not been initialised
with this system yet, suggest the user runs `/personal:dev init` first.

## Full user input

$ARGUMENTS

## Important: bundled files

This skill's directory is `${CLAUDE_SKILL_DIR}`. Paths under `scripts/`, `references/` and
`assets/`, here and in the reference files, are relative to it. Scripts act on the current
working directory, so run them from the project by their full path rather than changing
into the skill directory.

Scripts are executable with shebangs. Execute them directly — never prepend `bash`, `sh`,
or any interpreter. For example: `${CLAUDE_SKILL_DIR}/scripts/init-project.sh` not
`bash ${CLAUDE_SKILL_DIR}/scripts/init-project.sh`.

## Subcommands

The first word of the user input above is the subcommand. Everything after it is context
for that subcommand. If no argument was provided, list the available subcommands and ask
the user which they want.

### init

Initialise or update a project's AI boilerplate and task management structure.

Two phases:

1. Execute: `${CLAUDE_SKILL_DIR}/scripts/init-project.sh`
2. Read and follow the AI instructions in [references/init.md](references/init.md), which
   also cover offering a screenshot command in web projects

### new

Create a new task file in `docs/tasks-todo/`.

Read and follow [references/new.md](references/new.md). The context for the new task is
everything after "new" in the user input above.

### complete

Complete a task by moving it from `docs/tasks-todo/` to `docs/tasks-done/` with the
completion date added (`task-3-name.md` becomes `task-YYYY-MM-DD-3-name.md`).

The task identifier is the word immediately after "complete" in the user input. A pure
number matches that task number exactly; anything else matches as part of the filename.

Execute: `${CLAUDE_SKILL_DIR}/scripts/complete-task.sh <task-identifier>`

Report the result to the user. If the script reports no match or more than one match,
nothing was moved: show the user its output and ask which task they meant.

### renumber

Renumber prioritised tasks to start from 1 with no gaps.

Execute: `${CLAUDE_SKILL_DIR}/scripts/renumber-tasks.sh`

Report the result to the user.

### prime

Prime the current session with essential project context.

Read and follow [references/prime.md](references/prime.md). The context/focus area is
everything after "prime" in the user input above (if anything).
