#!/bin/bash
# renumber-tasks.sh - Renumber prioritised tasks to start from 1 with no gaps
# Usage: renumber-tasks.sh

set -e

# Find task directories - prefer CWD, fall back to project root
if [ -d "./docs/tasks-todo" ]; then
    BASE_DIR="."
elif [ -n "$CLAUDE_PROJECT_DIR" ] && [ -d "$CLAUDE_PROJECT_DIR/docs/tasks-todo" ]; then
    BASE_DIR="$CLAUDE_PROJECT_DIR"
else
    BASE_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"
fi

TODO_DIR="$BASE_DIR/docs/tasks-todo"

if [ ! -d "$TODO_DIR" ]; then
    echo "Error: $TODO_DIR not found"
    exit 1
fi

cd "$TODO_DIR"

# Get all numbered tasks, sorted by number
FILES=$(ls task-[0-9]*-*.md 2>/dev/null | sort -t- -k2,2n)

if [ -z "$FILES" ]; then
    echo "No numbered tasks found to renumber"
    exit 0
fi

# First pass: rename to temporary names to avoid conflicts
COUNTER=1
echo "$FILES" | while read -r FILE; do
    SUFFIX=$(echo "$FILE" | sed 's/^task-[0-9]*\(-.*\.md\)$/\1/')
    TEMP_NAME="task-temp-${COUNTER}${SUFFIX}"
    mv "$FILE" "$TEMP_NAME"
    COUNTER=$((COUNTER + 1))
done

# Second pass: rename from temp to final names
COUNTER=1
for FILE in task-temp-*-*.md; do
    if [ -f "$FILE" ]; then
        SUFFIX=$(echo "$FILE" | sed 's/^task-temp-[0-9]*\(-.*\.md\)$/\1/')
        FINAL_NAME="task-${COUNTER}${SUFFIX}"
        mv "$FILE" "$FINAL_NAME"
        echo "  $FINAL_NAME"
        COUNTER=$((COUNTER + 1))
    fi
done

echo ""
echo "Renumbered $((COUNTER - 1)) tasks"
