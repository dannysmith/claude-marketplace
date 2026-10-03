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
| `/personal:house-style` | Danny's default visual style: brand, palette, type, starter CSS, components and examples for pages, tools, slides and images |
| `/personal:video-creator` | Short videos (promos, explainers, animated slides) authored as HTML and rendered with Playwright and ffmpeg |

### `/personal:dev` subcommands

| Subcommand | Description |
| --- | --- |
| `init` | Initialise project with AI boilerplate and task management structure. Offers a `shoot` screenshot command in web projects |
| `new [description or GH issue]` | Create a new task from a description or GitHub issue |
| `complete <task>` | Complete a task (move to done with the completion date). A number matches that task number exactly, anything else matches part of the filename |
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
