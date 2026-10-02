---
name: unslopify
description: Remove AI slop and corporate language from text, leaving clean, natural writing without applying Danny's voice. Use when the user asks to "unslopify", "deslop", "remove slop", or "clean up AI text".
argument-hint: "[file/dir/text]"
disable-model-invocation: true
---

# /unslopify — Remove AI Slop

Takes machine-written or generic text and rewrites it as clean, plain prose a careful person might have written. It does not add Danny's voice; use `/danify` for that.

## Determine input

- **File path(s) passed as arguments** → read those files
- **Directory path** → read the markdown and text files in it
- **Inline text** → use it directly
- **Nothing passed** → use the text under discussion in the conversation. If it is unclear which text is meant, ask.

If the text reads as though Danny wrote it himself, say so and stop. His habits overlap with some slop patterns, and this command would strip them. Offer `/check` instead.

## Read the guide

Read these from the [guide](../guide/) skill:

1. [`nonos.md`](../guide/nonos.md)
2. [`writing-well.md`](../guide/writing-well.md)
3. [`structure-and-grammar.md`](../guide/structure-and-grammar.md), for UK English and punctuation

Do not read `writing-like-danny.md` or the samples.

## Process

1. **Read the whole text first.** Work out what it is trying to say, who it is for, and how formal it is meant to be.
2. **Find the patterns** in `nonos.md`, by family. Note which habits recur; those are the ones that matter.
3. **Rewrite by restructuring.** For each passage, work out what it is for and say that plainly. Replacing a stock phrase with a similar one is not a fix. Where a sentence says nothing, cut it.
4. **Apply `writing-well.md`**: lead with the content, plain words, concrete statements, the connectives that carry the logic.
5. **Keep the meaning and the register.** Formal text stays formal and casual text stays casual. Do not add opinions, examples or facts that were not in the source. If the source has invented-looking specifics or unsupported claims, flag them instead of polishing them.
6. **Reread the result** for patterns introduced by the rewrite.

If the text was already clean, say so and change nothing.

## Output

For inline text, return the cleaned text. For a file, ask whether to edit it in place or return the text, unless the request already makes that clear.

Then add a short summary of the main habits you removed and anything you flagged. Describe them in words; do not count phrases.
