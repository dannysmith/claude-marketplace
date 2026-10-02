# Prime Session Context

QUICKLY establish essential project understanding in a new session. The user may provide additional context/instructions as an argument.

## Steps

### 1. Read core documentation (in priority order)

1. CLAUDE.md / AGENTS.md (if not already in context)
2. README.md
3. docs/README.md if it exists
4. Any **fundamental** docs which the above call out as crucial reading (eg `docs/architecture-guide.md`)

### 2. Analyse the project

1. Check for files like package.json, Cargo.toml, pyproject.toml, go.mod etc to identify the primary language, framework and tooling.
2. Run `tree -L 5 --gitignore` to get an idea of the file structure. If `tree` isn't available, use `ls` instead.
3. If the user provided an argument with additional context, consider it and then read any obviously relevant files - especially any *evergreen* docs within `docs/`.
4. If your knowledge at this point STRONGLY suggests you should read more files, DO SO quickly. Eg.
   - In a React project you might fully read `package.json`, look at how it does routing and `ls` all the components.
   - In a small CSS experiment you might read `main.css` and `index.html` in full.
   - In a research project containing a few markdown files you might read them all.
   - TL;DR: Apply common sense here.

### 3. Check recent activity & current status

1. Check the current git branch, status and last few commits (eg `git log -10 --oneline`). If there are uncommitted changes, diff them.
2. Run `ls docs/tasks-todo/` to see upcoming tasks and `ls docs/tasks-done/ | tail -5` to see the most recently completed ones. Lowest-numbered task in `tasks-todo/` is next up; `task-x-` tasks are unprioritised. Skip this if the project has no `docs/tasks-todo/`.
3. Consider the user's input in the context of what you know so far, and read any task docs (or other docs) which you're confident are pertinent to the work at hand. The **absolute simplest** version of this is the user saying "what's next" and you reading the next-up task doc in `docs/tasks-todo/`.

### 4. Summarise for the user

Provide a concise summary of what you've "primed" yourself with. If you're confident about what the user wants to do next, suggest next actions. If not, simply ask. Respond appropriately on the scale between those two.

## Rules

- This is read-only. Do not change files or start on the work itself until the user asks.
- Do not go down rabbit holes or spend ages reading irrelevant files.
- Do not **fully** read VERY LARGE files in your main thread. If you need to read a large file, have a subagent do it and report back.
- Ignore generated directories like node_modules/, vendor/, dist/, build/ unless you have a strong reason not to.
- If there are project-specific Skills or CLI tools designed to provide **context** to AI Agents, use them to help.
