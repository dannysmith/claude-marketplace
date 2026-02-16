---
name: quickcheck
description: Quick writing quality check — scans for slop, style issues, spelling/grammar errors
argument-hint: "[file/dir/text]"
disable-model-invocation: true
---

# /quickcheck — Quick Writing Quality Check

Fast, in-context review of text for quality issues. No subagents spawned — this is a quick pass.

## Determine Input

Figure out what to check:
- **File path(s) passed as arguments** → read those files
- **Directory path** → read the files in it (markdown/text files)
- **Inline text** → use it directly
- **Nothing passed** → look at recent conversation context for text being discussed. If genuinely unclear, ask the user what they'd like checked.

## Load Skill Files

Read these files from the `guide` skill:
1. `nonos.md`
2. `structure-and-grammar.md`

Do NOT load `writing-like-danny.md` or examples — this is a quick quality check, not a voice review.

## Check the Text

Do a single careful pass through the text, checking for:

### 1. Spelling and Grammar
- Spelling errors (use UK English as the baseline)
- Grammar issues
- Punctuation problems
- Typos

### 2. nonos.md Violations
Walk through the categories in `nonos.md` and flag any matches:
- AI slop phrases and patterns
- Corporate bullshit
- Forced cleverness
- Weak language

### 3. Structure and Style
Check against `structure-and-grammar.md`:
- UK English compliance
- Paragraph length issues
- Sentence variety
- Formatting problems

### 4. General Quality (from writing-well.md principles in the skill)
- Clarity issues
- Weak openings
- Abstract language that should be concrete
- Unnecessary words to cut

## Output

Present findings grouped by severity. Be concise — this is a quick check, not an essay.

**Critical** (must fix): AI slop, spelling errors, grammar mistakes, wrong English variant
**Warnings** (should fix): Weak language, structural issues, clarity problems
**Suggestions** (nice to have): Minor improvements, tightening

Quote the specific text and provide concrete fixes. If the text is clean, say so briefly and move on.
