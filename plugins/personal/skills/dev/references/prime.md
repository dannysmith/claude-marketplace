# Prime Session Context

QUICKLY establish essential project understanding in a new session. The user may provide additional context/instructions as an argument.

## Steps

### 1. Read core documentation (in priority order)

1.1 CLAUDE.md / AGENTS.md (if not already read)
1.2 README.md
1.3 docs/README.md if it exists
1.4 Any **fundamental** docs mentioned in the above as curucial reading (eg `docs/architecture-guide.md` etc)

### 2. Analyse project

2.1 Check for existance of files like package.json, Cargo.toml, pyproject.toml, go.mod, etc to identify primary language, framework etc.
2.2 Run `tree -L 5` to get an idea of the file structure (If `tree` isn't available just use `ls` instead).
2.3 If the user provided an argument with additional context, consider it and then read any obviously relevant files - especially any *evergreen* docs within `docs/`
2.4 If your knowledge at this point SRONGLY suggests you should read more files, DO SO quickly. Eg.
  - In a React project you might fully read `package.json`, look at how it does routing and `ls` all the components.
  - In a small CSS experiment you might read `main.css` and `index.html` in full.
  - In a research project containing a few markdown files you might read them all.
  - TL;DR: Apply common sense here.

### 3. Check recent activity & current status.

- Check the current git branch, status and branch and last few commits (eg `git log -10`). If uncommited changes, diff them.
- Run `echo "## docs/tasks-todo\n" && ls docs/tasks-todo/ && echo "\n## Last 5 in docs/tasks-done/\n" && ls docs/tasks-done/ | tail -5` to see upconing and recent tasks.
- Consider the user's imput in the context of what you know so far... read any task docs (or other docs) which you're confident are pertinant to the work at hand. The **absolute simplest** version of this is the user saying "what's next" and you reading the next-up task doc in `docs/tasks-todo/`.

### 6. Summarise for User

Provide a concise summary of what you've "primed" yourself with. If you're confident about what the user wants us to do next, make a suggestion nor next actions. If not, ask the user simply. (Respond appropriatly on a scale between those two things)


## Rules

- Do not go down irrelevant rabbit holes and spend an hour reading irrelevant files.
- Do not **fully** read VERY LARGE files in your main thread. If you need to read a large file, have a subagent do it and report back.
- Ignore generated directories like node_modules/, vendor/, dist/, build/ unless you have a strong reason not to.
- If there are project-specific Skills or CLI tools designed to provide **context** to AI Agents, use them to help.
