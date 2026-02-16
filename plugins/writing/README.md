# Writing Plugin

Danny's writing voice, quality checking, deslopping, and style enforcement for Claude Code.

## Installation

```
/plugin marketplace add dannysmith github:dannysmith/claude-marketplace
/plugin install writing@dannysmith
```

## What's Included

### Skills

| Skill | User-Invocable | Description |
| --- | --- | --- |
| `guide` | No | Core writing guide — principles, voice, style rules, anti-slop patterns. Loaded by other skills. |
| `danify` | `/danify` | Rewrite text in Danny's voice |
| `unslopify` | `/unslopify` | Remove AI slop and corporate bullshit without applying Danny's voice |
| `quickcheck` | `/quickcheck` | Fast quality scan for slop, style issues, spelling/grammar |
| `fullcheck` | `/fullcheck` | Comprehensive review using parallel analyser agents |

### Agents

| Agent | Description |
| --- | --- |
| `writing-analyser` | Systematic writing quality analysis — used by `fullcheck` and available for direct use |

## Guide Files

The `guide` skill bundles the reference material that powers everything else:

- **`writing-well.md`** — Universal good writing principles
- **`writing-like-danny.md`** — Danny's distinctive voice characteristics
- **`nonos.md`** — AI slop, corporate bullshit, and weak language checklist
- **`structure-and-grammar.md`** — UK English, formatting, structure rules
- **`references/`** — Style guide, example articles, selected writing samples

## Usage

```
# Rewrite in Danny's voice
/danify path/to/draft.md

# Remove AI slop (voice-neutral)
/unslopify path/to/text.md

# Quick quality scan
/quickcheck path/to/article.md

# Full review with parallel agents
/fullcheck path/to/document.md
```
