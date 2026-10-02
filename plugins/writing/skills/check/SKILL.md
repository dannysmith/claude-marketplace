---
name: check
description: Review a piece of writing and report what to fix, without rewriting it. Use when the user asks to "check", "review", "proofread" or "give feedback on" a document. Pass "full" for an independent review by a fresh reader.
argument-hint: "[full] [file/dir/text]"
disable-model-invocation: true
---

# /check — Review Writing

Reads a piece of writing and reports what is wrong with it and what would improve it. It does not rewrite the piece.

## Determine input

- **File path(s) passed as arguments** → read those files
- **Directory path** → read the markdown and text files in it
- **Inline text** → use it directly
- **Nothing passed** → use the text under discussion in the conversation. If it is unclear which text is meant, ask.

## Work out who wrote it

This decides what counts as a problem, so settle it first. Ask if it is not clear from the request or the text.

- **Danny wrote it.** Review it as an editor who respects the author. Report errors (spelling, grammar, UK English, facts that look wrong), places where the meaning is unclear, weak or missing steps in the argument, and structure that makes the reader work. Do not report his habits as faults; they are listed under "Leave these alone" in `writing-like-danny.md`. Do not flag `nonos.md` patterns in his prose unless a passage has gone generic and you can say why.
- **A model or someone else wrote it**, and it is meant to go out under Danny's name. Review it against the whole guide: the patterns in `nonos.md`, the principles in `writing-well.md`, and how far it is from his voice. Flag anything that looks invented (anecdotes, quotes, statistics).
- **Mixed**: his draft with model-written sections. Treat each part accordingly and say which parts read as which.

## Read the guide

Read these from the [guide](../guide/) skill:

1. [`writing-like-danny.md`](../guide/writing-like-danny.md)
2. [`structure-and-grammar.md`](../guide/structure-and-grammar.md)
3. [`nonos.md`](../guide/nonos.md) and [`writing-well.md`](../guide/writing-well.md), when any of the text is not his

## Default: review it yourself

Read the whole piece once for what it is trying to do, then again for problems.

## With "full": get a fresh reader

Use this when the piece matters, and whenever the text was drafted in this conversation, since you cannot read your own draft cold.

Launch one `writing-analyser` agent per document. Tell it who wrote the text (Danny, a model, or mixed), what the piece is for, and who will read it. Give it the file path or the text and nothing about how the draft came to be. When it reports back, check its findings against the text yourself before passing them on, and drop any that misread the piece or flag his habits.

## Output

Start with two or three sentences: what the piece does well and the one thing that would most improve it.

Then list the findings in order of importance. For each, quote the text, say what the problem is, and suggest a fix. Group repeated instances of the same habit into one finding. Keep spelling and grammar corrections together as a compact list at the end.

Report what you found and stop. If the piece is in good shape, say so briefly; do not pad the list.
