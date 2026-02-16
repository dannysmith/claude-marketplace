---
name: unslopify
description: Remove AI slop and corporate bullshit from text — produces clean, natural, human-sounding writing
argument-hint: "[file/dir/text]"
disable-model-invocation: true
---

# /unslopify — Remove AI Slop

Takes text and systematically removes AI slop, corporate bullshit, and unnatural language. The goal is clean, natural, human-sounding writing — NOT to apply Danny's specific voice.

## Determine Input

Figure out what to deslopify:
- **File path(s) passed as arguments** → read those files
- **Directory path** → read the files in it (markdown/text files)
- **Inline text** → use it directly
- **Nothing passed** → look at recent conversation context for text being discussed. If genuinely unclear, ask the user what they'd like deslopified.

## Load Skill Files

Read these files from the `guide` skill:
1. `writing-well.md`
2. `nonos.md`

Do NOT load `writing-like-danny.md`. This command is about deslopping, not danifying. Some incidental Danny flavour bleeding through from `writing-well.md` is fine — his principles of good writing are good principles of writing — but the focus is on removing slop, not adding voice.

## Process

### 1. Read and Understand the Text
Read the full text first. Understand what it's trying to say, who the audience is, and what tone it's going for. You're cleaning the text, not rewriting it from scratch.

### 2. Systematic Slop Removal
Walk through `nonos.md` and fix every violation:
- Replace banned AI phrases with natural alternatives (or delete)
- Replace corporate bullshit with plain language
- Cut forced cleverness
- Strengthen weak language
- Fix structural AI tells (perfect balance, neat summaries, hedge-everything)

### 3. Apply writing-well.md Principles
- Sharpen clarity — make every sentence clear
- Fix word choice — precise over impressive, concrete over abstract
- Improve rhythm — vary sentence lengths, add punch
- Cut unnecessary words — aim for 20% reduction
- Fix transitions — natural flow, not announcements
- Ensure the opening earns the reader's attention

### 4. Preserve Intent
Don't change the meaning, argument, or intended tone. If the original is formal, keep it formal (just remove the slop). If it's casual, keep it casual. You're polishing, not transforming.

## Output

Present the deslopified text in full, then a brief summary of what changed:

```markdown
## Deslopified Text

[The full rewritten text]

## What Changed
- [Brief list of the main types of changes made]
- [e.g. "Removed 12 AI slop phrases", "Replaced corporate jargon throughout", "Cut ~25% unnecessary words"]
```

If the text was already clean, say so. Don't make changes for the sake of it.
