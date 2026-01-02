# Danny's Global Claude Code Plugin - Requirements

This document captures the requirements for consolidating Danny's personal Claude Code customizations (slash commands, skills, and agents) from multiple repos into a single global plugin.

---

## Current State

### Locations of Existing Customizations

| Type             | Current Location                  | GitHub Repo                       |
| ---------------- | --------------------------------- | --------------------------------- |
| Slash Commands   | `~/.dotfiles/claude/commands/g/`  | dannysmith/dotfiles               |
| Agents           | `~/.claude/agents/`               | dannysmith/agents (separate repo) |
| Skills           | `~/.claude/skills/`               | (local only)                      |
| Global CLAUDE.md | `~/.claude/CLAUDE.md` (symlinked) | dannysmith/dotfiles               |

### Existing Slash Commands

Found in `~/.dotfiles/claude/commands/g/`:

1. **`/g:prime-context`** - Prime session with project context

   - Reads CLAUDE.md, README, and project config
   - Analyzes structure and dependencies
   - Provides concise project summary

2. **`/g:create-claude-command`** - Create new custom slash commands

   - Template-based command creation
   - Best practices guidance

3. **`/g:initaiboilerplate`** - Initialize AI assistant boilerplate

   - Creates AGENTS.md, CLAUDE.md, GEMINI.md
   - Non-destructive (won't overwrite existing)

4. **`/g:tasks:init`** - Initialize task management system

   - Creates `docs/tasks-todo/` and `docs/tasks-done/`
   - Adds completion script for npm projects

5. **`/g:tasks:new`** - Create new unprioritized task

   - Creates `task-x-[name].md` in tasks-todo

6. **`/g:tasks:newgh`** - Create task from GitHub issue

   - Fetches issue details via `gh` CLI
   - Creates task file with issue content

7. **`/g:tasks:renumber`** - Renumber prioritized tasks

   - Reorders task files to eliminate gaps

8. **`/g:docs:update`** - Update documentation
   - Reviews recent changes
   - Updates relevant docs in `docs/`

### Existing Agents

Found in `~/.claude/agents/`:

1. **`code-refactorer`** - Code architecture specialist

   - Analyzes code for structural improvements
   - Identifies technical debt and refactoring opportunities
   - Tools: Read, Grep, Glob, Bash, Edit, MultiEdit

2. **`danny-voice-writer`** - Writing in Danny's distinctive voice

   - Conversational yet substantive
   - UK English, cuts corporate speak
   - Editorial partner, not content generator
   - Tools: Read, Write

3. **`designer`** - Visual design and frontend development

   - React/Next.js/Tailwind/shadcn/ui expertise
   - Design systems and component architecture
   - Tools: Read, Grep, Glob, Write, Task, WebFetch

4. **`fact-checker`** - Information verification

   - Implements SIFT method
   - Verifies technical claims
   - Tools: WebSearch, WebFetch, Task, Context7 MCP

5. **`security-auditor`** - Security audit specialist

   - OWASP Top 10 expertise
   - Comprehensive vulnerability scanning
   - Tools: Read, Grep, Glob, Bash, Write

6. **`technical-docs-writer`** - Technical documentation

   - READMEs, API docs, architecture guides
   - Tools: Read, Grep, Glob, Write, Task

7. **`user-guide-writer`** - User-facing documentation
   - Non-technical user guides
   - Plain language explanations
   - Tools: Read, Grep, Glob, Write

### Existing Skills

Found in `~/.claude/skills/`:

1. **`css-expert`** - Modern CSS expertise
   - Cascade layers, OKLCH, container queries
   - Comprehensive reference documentation
   - MCP integrations for browser compat and DevTools

---

## Target Plugin Structure

Based on Claude Code plugin specification. Commands are namespaced to separate personal/general commands from development-focused ones.

```
claude-plugin-dannysmith/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── commands/                    # Slash commands
│   ├── morning.md               # /dannysmith:morning (personal)
│   ├── create-command.md        # /dannysmith:create-command (meta)
│   └── dev/                     # Development-focused commands
│       ├── prime-context.md     # /dannysmith:dev:prime-context
│       ├── initai.md            # /dannysmith:dev:initai
│       ├── tasks-init.md        # /dannysmith:dev:tasks-init
│       ├── tasks-new.md         # /dannysmith:dev:tasks-new
│       ├── tasks-newgh.md       # /dannysmith:dev:tasks-newgh
│       ├── tasks-renumber.md    # /dannysmith:dev:tasks-renumber
│       └── docs-update.md       # /dannysmith:dev:docs-update
├── agents/                      # Agent definitions
│   ├── code-refactorer.md
│   ├── danny-voice-writer.md
│   ├── designer.md
│   ├── fact-checker.md
│   ├── security-auditor.md
│   ├── technical-docs-writer.md
│   └── user-guide-writer.md
├── skills/                      # Skills with SKILL.md
│   └── css-expert/
│       ├── SKILL.md
│       └── references/          # Supporting docs
├── README.md                    # Plugin documentation
└── LICENSE
```

**Note on task-management:** Not needed as a separate skill - use the existing `tdn` CLI tool (installed via Homebrew) and existing tdn plugin.

---

## New Components to Create

### 1. `/morning` Slash Command

A comprehensive morning planning command based on the documented morning briefing workflow. See /Users/danny/notes/ai-docs/project-custom-instructions/Morning Briefing Custom Instructions.md for guidance.

**Requirements:**

- Gather current context BEFORE engaging LLM:
  - Current date and time (local)
- Fetch external data:
  - Morning briefing from GitHub (`https://raw.githubusercontent.com/dannysmith/morning-briefing-generator/refs/heads/main/dailybriefs/latest.md`)
  - Task context from `tdn context --ai`
- Load the `task-management` skill
- Walk through morning planning conversation
  - Check morning routine completion
  - Show briefing and task overview
  - Facilitate day planning conversation
  - Ask reflective questions about yesterday
  - Help identify today's MITs
- Write summary to today's day note in Obsidian (`~/notes/2-day-notes/YYYY-MM-DD.md`)

## Plugin Manifest

**`.claude-plugin/plugin.json`:**

```json
{
  "name": "dannysmith",
  "version": "1.0.0",
  "description": "Danny's global Claude Code customizations - commands, agents, and skills for personal productivity and development workflows",
  "author": {
    "name": "Danny Smith",
    "url": "https://danny.is"
  },
  "repository": "https://github.com/dannysmith/claude-plugin-dannysmith",
  "license": "MIT",
  "keywords": [
    "productivity",
    "personal",
    "morning-planning",
    "task-management",
    "writing",
    "css"
  ]
}
```

---

## Actions Required

### Phase 1: Plugin Setup

- [x] Create plugin folder structure
- [x] Write `plugin.json` and `marketplace.json` manifests
- [x] Initialize git repository

### Phase 2: Migrate Commands & Hooks

- [x] Move slash commands from `.dotfiles` repo (`~/.dotfiles/claude/commands/)
- [x] Update command paths and references
- [x] Migrate the two hooks from global settings file (~/.dotfiles/claude/settings.json) and remove from ~/.dotfiles/claude/settings.json
- [x] Test each command works in plugin context
- [x] Clean up dotfiles, commit and push dotfiles repo

### Phase 3: Migrate Agents

- [x] Move agents from `~/.claude/agents/`
- [x] Review and simplify agents if needed (fixed fact-checker MCP tool reference)
- [x] Ensure all agents work in plugin context
- [x] Archive https://github.com/dannysmith/agents on GH and remove `agents` from ~/.claude/`

### Phase 4: Migrate Skill

- [x] Move `css-expert` skill from `~/.claude/skills/css-expert`
- [x] Refactor as necessary so it works in a plugin context. Update README.
- [x] Add chrome-devtools and other MCPs to `mcp.json`.
- [x] Ensure skill references work correctly
- [x] Trash `~/.claude/skills/css-expert` , archive https://github.com/dannysmith/css-expert and uninstall old skill from CC.

### Phase 5: Create New Slash Command

This phase will need to involve some manual work and conversation and reading from the user.

- [ ] Create `/morning` command
- [ ] Integrate with task-management skill
- [ ] Test morning workflow end-to-end

### Phase 6: Review Global CLAUDE.md

- [ ] Identify what can be removed/simplified
- [ ] Update to reference plugin commands
- [ ] Ensure rules still work correctly

### Phase 7: Publish & Test

- [ ] Update README.md with installation instructions. Mention taskdn repo etc.
- [ ] Publish to GitHub & set up repo properly (description, settings etc)
- [ ] Check local installation & clean up as needed
- [ ] Test installation and functionality
- [ ] Create GH Issues for future plugin ideas.

---

## Decisions Made

1. **Task Management Skill:** Not needed - continue using existing `tdn` CLI tool and tdn plugin.

2. **Morning Command Dependencies:** Fail gracefully if dependencies unavailable (Obsidian vault, tdn CLI, internet).

3. **Agent Review:** Keep all 7 agents. Built-in agents (general-purpose, plan, explore) don't overlap significantly with custom agents which provide specialized domain expertise.

## Future Work

- [ ] Give the morning command access to my Google Calendar somehow, possibly via an MCP?
- [ ] Create a compiled Swift binary which can be run and uses Mac OS APIs to get the current weather information and the current location in exactly the same way that it would if I opened Apple Maps or Apple Weather. This can then be Added to my dot files and used by various commands etc.

---

## References

- [Claude Code Plugin Documentation](https://code.claude.com/docs/en/plugins)
- [Agent Skills Specification](https://agentskills.io/specification)
- [Morning Briefing Custom Instructions](~/notes/ai-docs/project-custom-instructions/Morning%20Briefing%20Custom%20Instructions.md)
- [Current Global CLAUDE.md](~/.claude/CLAUDE.md)
