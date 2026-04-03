# New Task

Create a new task file in `docs/tasks-todo/`.

## Determine the source

Examine the user's input to determine the task source:

- **GitHub issue**: Input contains a GitHub URL (`github.com/.../issues/`), or `#123`, or is
  a bare issue number. Fetch with `gh issue view <ref> --json title,body,url,comments`.
- **User description**: Anything else — a title, a sentence, or multiple paragraphs of dictated
  notes etc.

## Create the file

**Filename**: `task-x-KEBAB-NAME.md` where KEBAB-NAME is derived from the title:
- Lowercase, alphanumeric and hyphens only
- Maximum 5 words
- `x` marks it as unprioritised

**File location**: `docs/tasks-todo/` (create the parent directories if you get errors that it does not exist)

### File format

```markdown
# Task: {TITLE_AS_TITLECASE}

{GH_ISSUE_URL if from GitHub, otherwise omit this line}

{BRIEF_DESCRIPTION}

## Goal

{If the input provides a clear goal, insert it here. Otherwise leave blank.}

## Requirements

{If the input provides clear requirements, list them. Otherwise leave blank.}

## Phased Implementation Plan

Work through each phase in accordance with the user's instructions. Mark completed phases by appending "[✅ DONE]" to the heading.

### Phase 1 - TBD

### Final Phase - Cleanup

- [ ] Run full checks & tests and fix any issues
- [ ] Check for any evergreen docs in `docs/` or `docs/developer/` which are now incorrect and need updating. Likewise for `AGENTS.md` and `README.md` if needed.
```

## What to fill in

Only populate sections using information the user has actually provided. Do not invent requirements, goals, or implementation phases.

- **Title only**: Fill in the title. Leave everything else blank for the user.
- **Short description**: Fill in the title and brief description. Leave Goal, Requirements,
  and Phases blank.
- **Detailed description**: Extract and fill in the description, goal (if stated), and
  requirements (if stated). Leave phases as TBD unless the user has explicitly outlined them.
- **User-provided phases**: If the user has given explicit phase structure (e.g. "three phases:
  1. API layer, 2. Frontend, 3. Tests"), create those phase headings. Do not elaborate beyond
  what was stated.
- **GitHub issue**: Always include the URL. Use the issue title as the task title. Use the issue
  body for description/goal/requirements where the content clearly maps. Do not reinterpret or
  expand on the issue content beyond minor cleanup.

## After creation

Report the filename, path and a clear summary of the file's contents to the user. If the task was created with mostly empty sections, mention that they can fill in the details when they are ready to start work.
