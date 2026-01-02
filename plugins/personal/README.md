# personal

Danny's personal Claude Code plugin for productivity and development workflows.

## Installation

```
/plugin marketplace add dannysmith github:dannysmith/claude-marketplace
/plugin install personal@dannysmith
```

## Skills

None

## Commands

| Command                          | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `/dannysmith:morning`            | Morning planning workflow with briefing and task review |
| `/dannysmith:dev:prime-context`  | Prime session with project context                      |
| `/dannysmith:dev:initai`         | Initialize AI assistant boilerplate files               |
| `/dannysmith:dev:tasks-init`     | Initialize task management system                       |
| `/dannysmith:dev:tasks-new`      | Create new unprioritized task                           |
| `/dannysmith:dev:tasks-newgh`    | Create task from GitHub issue                           |
| `/dannysmith:dev:tasks-renumber` | Renumber prioritized tasks                              |
| `/dannysmith:dev:docs-update`    | Update documentation based on recent changes            |

## Agents

| Agent                   | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `code-refactorer`       | Analyzes code for structural improvements and technical debt    |
| `danny-voice-writer`    | Writing in Danny's conversational, substantive voice            |
| `designer`              | Visual design and frontend development (React/Next.js/Tailwind) |
| `fact-checker`          | Information verification using SIFT method                      |
| `security-auditor`      | Security audit specialist (OWASP Top 10)                        |
| `technical-docs-writer` | Technical documentation (READMEs, API docs)                     |
| `user-guide-writer`     | User-facing documentation in plain language                     |

## Hooks

| Event          | Action                                                              |
| -------------- | ------------------------------------------------------------------- |
| `Notification` | macOS notification when Claude needs input (via `terminal-notifier`) |
| `Stop`         | macOS notification when Claude finishes a task                      |

## Output Styles

None

## MCPs

None

## LSPs

None

## Dependencies

This plugin integrates with:

- [taskdn](https://github.com/dannysmith/taskdn) - CLI task manager (for task commands)
- [tdn-marketplace](https://github.com/dannysmith/tdn-marketplace) - Claude Code plugin for taskdn
- Obsidian vault at `~/notes/` (for morning planning)
