---
name: danify
description: Rewrite text in Danny's voice. Use when the user asks to "danify", "rewrite in my voice", "make this sound like me", or wants text that a model or someone else wrote turned into his writing style.
argument-hint: "[file/dir/text]"
disable-model-invocation: true
---

# /danify — Rewrite in Danny's Voice

Takes text that Danny did not write (usually a model's draft) and rewrites it the way he would have written it. The result is a draft for him to edit, so the aim is to leave him less to do, not to produce a finished piece.

## Determine input

- **File path(s) passed as arguments** → read those files
- **Directory path** → read the markdown and text files in it
- **Inline text** → use it directly
- **Nothing passed** → use the text under discussion in the conversation. If it is unclear which text is meant, ask.

If the text reads as though Danny wrote it himself, say so before rewriting. Rewriting his own prose "into his voice" makes it worse. Offer a check or a light edit instead.

## Read the guide

Read these from the [guide](../guide/) skill, in full:

1. [`SKILL.md`](../guide/SKILL.md), for the three jobs and the rule against inventing material
2. [`writing-like-danny.md`](../guide/writing-like-danny.md)
3. [`writing-well.md`](../guide/writing-well.md)
4. [`nonos.md`](../guide/nonos.md)
5. [`structure-and-grammar.md`](../guide/structure-and-grammar.md)

Then read the sample file that matches the kind of piece. The samples matter more than the descriptions:

- Article, essay, anything argued → [`reference-blog-articles.md`](../guide/references/reference-blog-articles.md)
- Work document, guide, proposal → [`reference-internal-docs.md`](../guide/references/reference-internal-docs.md)
- Note, short post, informal update → [`reference-recent-notes.md`](../guide/references/reference-recent-notes.md)

## Process

1. **Understand the source.** What is it saying, who is it for, and which register does it call for: considered, quick and personal, or functional? If that is unclear, ask.
2. **Keep the substance.** The facts, the argument and the order of ideas stay unless they are the problem. If the source is padded or says nothing in places, cut those parts and say that you did.
3. **Rewrite it as he would write it**, in the register the piece calls for. Work from the samples. Use his traits where the content calls for them; do not try to fit them all in.
4. **Do not invent.** No made-up anecdotes, opinions, quotes, people or numbers. Where his writing would have a personal example or a stated opinion and the source has none, leave a marker: `[DANNY: …]`.
5. **Review the result against `nonos.md`** as a separate pass, and fix what you find by restructuring.

## Output

For inline text, return the rewritten text. For a file, ask whether to edit it in place or return the text, unless the request already makes that clear.

Then add a short note: the register you chose, anything you cut, and where the `[DANNY: …]` markers are.
