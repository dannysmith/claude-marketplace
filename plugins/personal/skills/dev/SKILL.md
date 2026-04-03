---
name: dev
description: >-
  This skill should be used when the user invokes "/personal:dev" with a subcommand.
  Subcommands: init (project + task setup), new (create task from description or GH issue),
  complete (finish a task), renumber (reorder task priorities), prime (load project context).
argument-hint: <init|new|complete|renumber|prime> [args]
disable-model-invocation: true
allowed-tools: Bash Read Write Edit Glob Grep
---

# Dev Utilities

Project development utilities for initialisation, task management, and context priming.

## Subcommands

Route based on the first argument (`$0`). If no argument is provided, list the available
subcommands and ask the user which they want.

### init

Initialise or update a project's AI boilerplate and task management structure.

Two phases:

1. Run the shell script: `bash ${CLAUDE_SKILL_DIR}/scripts/init-project.sh ${CLAUDE_SKILL_DIR}/assets`
2. Read and follow the AI instructions in [references/init.md](references/init.md)

### new

Create a new task file in `docs/tasks-todo/`.

Read and follow [references/new.md](references/new.md), passing all remaining arguments as context.

The user's input: $1

### complete

Complete a task by moving it from `docs/tasks-todo/` to `docs/tasks-done/` with a date prefix.

Run: `bash ${CLAUDE_SKILL_DIR}/scripts/complete-task.sh $1`

Report the result to the user.

### renumber

Renumber prioritised tasks to start from 1 with no gaps.

Run: `bash ${CLAUDE_SKILL_DIR}/scripts/renumber-tasks.sh`

Report the result to the user.

### prime

Prime the current session with essential project context.

Read and follow [references/prime.md](references/prime.md).

The user's focus area (if provided): $1
