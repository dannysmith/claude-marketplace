# {PROJECT_NAME}

## Overview

## Development

<!-- Key development commands, setup instructions, common workflows -->

## Task Management

Tasks are tracked as markdown files in `docs/`.

- **Todo**: `docs/tasks-todo/task-NUMBER-name.md`
  - Numbered tasks are prioritised (lowest number = highest priority)
  - `task-x-name.md` = unprioritised
- **Done**: `docs/tasks-done/YYYY-MM-DD-task-[NUMBER]-name.md`
  - Date prefix is the completion date

To complete a task, move it from `tasks-todo/` to `tasks-done/` and prepend today's date to the filename. If `devtask-complete` is available globally on your PATH, it does this automatically (e.g. `devtask-complete 2` or `devtask-complete mytask`). If you have the `/personal:dev` Skill available you can use it in the same way via `/personal:dev complete mytask`.
