---
name: danify
description: Rewrite text in Danny's distinctive voice — conversational, substantive, cuts through bullshit
argument-hint: "[file/dir/text]"
disable-model-invocation: true
---

# /danify — Rewrite in Danny's Voice

Takes text (probably not written by Danny) and rewrites it in Danny's distinctive voice. This is a full voice transformation, not just deslopping.

## Determine Input

Figure out what to danify:
- **File path(s) passed as arguments** → read those files
- **Directory path** → read the files in it (markdown/text files)
- **Inline text** → use it directly
- **Nothing passed** → look at recent conversation context for text being discussed. If genuinely unclear, ask the user what they'd like danified.

## Load Skill Files

Read these files from the `guide` skill:
1. `writing-well.md`
2. `writing-like-danny.md`
3. `nonos.md`

Also use judgement on whether to load additional references:
- For substantial work (long blog post, major document) → read `references/selected-examples.md` for voice calibration
- If the text is a specific document type → also read the relevant reference file:
  - Blog post or personal essay → `references/reference-blog-articles.md`
  - Internal docs, guides, knowledge base → `references/reference-internal-docs.md`
- For short/simple text → examples probably aren't needed

## Process

### 1. Understand the Source Text
Read the full text. Identify:
- What it's trying to say (the core argument/message)
- Who the audience is
- What context it's for (blog, docs, email, proposal, etc.)
- What's worth keeping vs what needs transformation

### 2. Deslopify First
Before adding Danny's voice, clean the text using `nonos.md` and `writing-well.md`. Remove AI slop, corporate bullshit, and weak language. This is the foundation.

### 3. Apply Danny's Voice
Layer Danny's voice from `writing-like-danny.md`:

- **Tone**: Pub chat — conversational but substantive. Warm, irreverent, never boring.
- **Structure**: Use Danny's patterns — hook→context→deep dive, personal→universal, bold assertion→nuance
- **Rhythm**: Mix sentence lengths dramatically. Fragments for emphasis. Start with And/But/So.
- **Word choice**: Danny's preference — shorter, more specific, more vulnerable, more opinionated
- **Direct address**: Use "you", ask questions readers are thinking
- **Examples**: Replace generic examples with specific, concrete ones
- **Bold**: Key concepts and phrases in bold
- **Contractions**: Always (it's, won't, we'll)
- **UK English**: Always

Use the transformation table in `writing-like-danny.md` as a guide for common AI→Danny conversions.

### 4. Quality Check
Run through Danny's quality checklist:
- Does paragraph 1 earn paragraph 2?
- Is there at least one surprising moment?
- Did I take a clear position?
- Can I cut 20% more?
- Does it sound like Danny on his best day?

### 5. Adapt to Context
Use the context adaptation guide from the skill:
- **Informal** (emails, Slack): 2-3 sentence paragraphs, fully conversational
- **Informal long-form** (blog posts): Same energy, more structure, room to build arguments
- **Semi-formal** (proposals, client docs): "We recommend" not "It is recommended", selective contractions
- **Technical** (docs, guides): Clarity first, anticipate "yeah, but..." questions
- **Personal essays**: Maximum vulnerability in paragraph 1, specific→universal

## Output

Present the danified text in full, then a brief note on the approach:

```markdown
## Danified Text

[The full rewritten text in Danny's voice]

## Notes
- [Brief explanation of the approach taken and key transformations]
- [Any decisions you made about tone/context that the user might want to adjust]
```

Always present this as a draft. Danny's voice is his — this is a starting point, not a final product.
