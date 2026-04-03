#!/bin/bash
# complete-task.sh - Move a task from todo to done with today's date prefix
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

# Find matching file (case-insensitive)
MATCH=$(ls "$TODO_DIR"/ 2>/dev/null | grep -i "$TASK_ID" | head -1)

if [ -z "$MATCH" ]; then
    echo "Error: No task found matching '$TASK_ID'"
    echo ""
    echo "Available tasks:"
    ls "$TODO_DIR"/*.md 2>/dev/null | xargs -n1 basename 2>/dev/null || echo "  (none)"
    exit 1
fi

TODAY=$(date +%Y-%m-%d)
NEW_NAME="${TODAY}-${MATCH}"

if [ -f "$DONE_DIR/$NEW_NAME" ]; then
    echo "Error: $DONE_DIR/$NEW_NAME already exists"
    exit 1
fi

mv "$TODO_DIR/$MATCH" "$DONE_DIR/$NEW_NAME"
echo "Completed: $MATCH"
echo "  From: $TODO_DIR/$MATCH"
echo "  To:   $DONE_DIR/$NEW_NAME"
