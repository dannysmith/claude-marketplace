#!/bin/bash
# complete-task.sh - Move a task from todo to done, adding today's date after "task-"
# e.g. task-3-add-login.md -> task-2026-01-31-3-add-login.md
# Usage: complete-task.sh <task-name-or-number>

set -e

TASK_ID="${1:?Usage: complete-task.sh <task-name-or-number>}"

# Find task directories - prefer CWD, fall back to project root
if [ -d "./docs/tasks-todo" ]; then
    BASE_DIR="."
elif [ -n "$CLAUDE_PROJECT_DIR" ] && [ -d "$CLAUDE_PROJECT_DIR/docs/tasks-todo" ]; then
    BASE_DIR="$CLAUDE_PROJECT_DIR"
else
    BASE_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"
fi

TODO_DIR="$BASE_DIR/docs/tasks-todo"
DONE_DIR="$BASE_DIR/docs/tasks-done"

if [ ! -d "$TODO_DIR" ]; then
    echo "Error: $TODO_DIR not found"
    exit 1
fi

if [ ! -d "$DONE_DIR" ]; then
    echo "Error: $DONE_DIR not found (has this project been initialised?)"
    exit 1
fi

# Find matching tasks: a pure number matches that task number exactly,
# anything else is a case-insensitive substring of the filename
MATCHES=()
for FILE in "$TODO_DIR"/task-*.md; do
    [ -f "$FILE" ] || continue
    NAME=$(basename "$FILE")
    if [[ "$TASK_ID" =~ ^[0-9]+$ ]]; then
        if [[ "$NAME" == task-"$TASK_ID"-* ]]; then
            MATCHES+=("$NAME")
        fi
    elif echo "$NAME" | grep -qiF -- "$TASK_ID"; then
        MATCHES+=("$NAME")
    fi
done

if [ ${#MATCHES[@]} -eq 0 ]; then
    echo "Error: No task found matching '$TASK_ID'"
    echo ""
    echo "Available tasks:"
    ls "$TODO_DIR"/task-*.md 2>/dev/null | xargs -n1 basename 2>/dev/null || echo "  (none)"
    exit 1
fi

if [ ${#MATCHES[@]} -gt 1 ]; then
    echo "Error: '$TASK_ID' matches more than one task, nothing completed"
    echo ""
    echo "Matching tasks:"
    printf '  %s\n' "${MATCHES[@]}"
    exit 1
fi

MATCH="${MATCHES[0]}"
TODAY=$(date +%Y-%m-%d)
NEW_NAME="task-${TODAY}-${MATCH#task-}"

if [ -f "$DONE_DIR/$NEW_NAME" ]; then
    echo "Error: $DONE_DIR/$NEW_NAME already exists"
    exit 1
fi

mv "$TODO_DIR/$MATCH" "$DONE_DIR/$NEW_NAME"
echo "Completed: $MATCH"
echo "  From: $TODO_DIR/$MATCH"
echo "  To:   $DONE_DIR/$NEW_NAME"
