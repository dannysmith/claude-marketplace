# Writing Plugin

Danny's writing voice, style rules and anti-slop guidance for Claude Code, plus commands for rewriting, cleaning and reviewing text.

## Installation

```
/plugin marketplace add dannysmith github:dannysmith/claude-marketplace
/plugin install writing@dannysmith
```

## What's included

### Skills

| Skill       | Invoked by   | Description                                                                              |
| ----------- | ------------ | ---------------------------------------------------------------------------------------- |
| `guide`     | The model    | The writing guide. Loads when drafting for Danny, rewriting into his voice or reviewing. |
| `danify`    | `/danify`    | Rewrite text a model or someone else wrote into Danny's voice                            |
| `unslopify` | `/unslopify` | Remove AI slop and corporate language without adding his voice                           |
| `check`     | `/check`     | Review a piece and report what to fix. `/check full` uses an independent reviewer        |

### Agents

| Agent              | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `writing-analyser` | A fresh reader that reviews one document against the guide and reports back |

## How the guide is organised

The guide separates three jobs, because they need different behaviour:

1. **Drafting for Danny**, so the draft needs less editing.
2. **Turning someone else's text into his voice.**
3. **Working on text he wrote**, where the job is to help without sanding off his habits.

One rule applies to all three: never invent anecdotes, quotes, people or opinions. A `[DANNY: …]` marker goes in the text instead.

| File                                    | Holds                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `SKILL.md`                              | The three jobs, the no-invention rule, what to read, how to draft          |
| `writing-like-danny.md`                 | His voice by register, and the habits to leave alone                       |
| `writing-well.md`                       | Voice-neutral principles for clear prose                                   |
| `nonos.md`                              | Families of patterns that mark text as machine-written                     |
| `structure-and-grammar.md`              | UK English, punctuation, emphasis, headings, lists                         |
| `references/styleguide.md`              | Specific style decisions, on top of the Guardian style guide               |
| `references/reference-blog-articles.md` | Full articles and essays: considered writing                               |
| `references/reference-internal-docs.md` | Guides, proposals and process docs                                         |
| `references/reference-recent-notes.md`  | Recent short notes from danny.is: casual register and current vocabulary   |

The samples are the most important part. To keep the voice current, add recent pieces to the reference files.

## Usage

```
# Rewrite a model's draft in Danny's voice
/danify path/to/draft.md

# Remove AI slop (voice-neutral)
/unslopify path/to/text.md

# Review a piece
/check path/to/article.md

# Review with an independent reader
/check full path/to/article.md
```
