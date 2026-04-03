# personal

Danny's personal Claude Code plugin for productivity and development workflows.

## Installation

```
/plugin marketplace add dannysmith github:dannysmith/claude-marketplace
/plugin install personal@dannysmith
```

## Skills

| Skill | Description |
| --- | --- |
| `/personal:dev <subcommand>` | Project development utilities - init, new, complete, renumber, prime |
| `/personal:morning` | Morning planning session with briefing, tasks, and day planning |

### `/personal:dev` subcommands

| Subcommand | Description |
| --- | --- |
| `init` | Initialise project with AI boilerplate and task management structure |
| `new [description or GH issue]` | Create a new task from a description or GitHub issue |
| `complete <task>` | Complete a task (move to done with date prefix) |
| `renumber` | Renumber prioritised tasks to start from 1 with no gaps |
| `prime [focus]` | Prime session with essential project context |

## Agents

None

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
