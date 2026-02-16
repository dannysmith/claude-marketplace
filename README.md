# Claude Marketplace - dannysmith

My personal collection of Claude Code plugins.

## Installation

Add this marketplace to Claude Code:

```
/plugin marketplace add dannysmith/claude-marketplace
```

Then install individual plugins:

```
/plugin install <plugin-name>@dannysmith
```

## Available Plugins

| Plugin       | Description                                                                           | For Others? |
| ------------ | ------------------------------------------------------------------------------------- | ----------- |
| `personal`   | Morning planning, task management commands, and custom agents tailored to my workflow | No          |
| `css-expert` | Modern CSS expertise - cascade layers, OKLCH, container queries, defensive patterns   | Yes         |
| `writing`    | Writing voice, quality checking, deslopping, and style enforcement                    | No          |

### personal

My daily driver plugin with:

- **Commands**: Morning planning, task management (`/tasks:*`), documentation updates
- **Agents**: code-refactorer, designer, fact-checker, security-auditor, technical-docs-writer, user-guide-writer

This plugin is configured for my specific workflow and integrates with:

- [taskdn](https://github.com/dannysmith/taskdn) - my CLI task manager
- My Obsidian vault for notes and day planning

### writing

Writing plugin with Danny's voice, quality checking, and deslopping. Includes:

- **Skills**: `guide` (core reference), `/danify`, `/unslopify`, `/quickcheck`, `/fullcheck`
- **Agents**: `writing-analyser` for systematic quality analysis

This plugin is tailored to Danny's writing voice and style preferences (UK English).

### css-expert

A skill for modern CSS development, useful for anyone. Covers:

- Cascade layers (`@layer`)
- OKLCH color space
- Container queries
- Defensive CSS patterns
- Modern layout techniques

## Related

- [taskdn](https://github.com/dannysmith/taskdn) - CLI task manager (required for `personal` plugin task commands)
- [tdn-marketplace](https://github.com/dannysmith/tdn-marketplace) - Claude Code plugin for taskdn integration
