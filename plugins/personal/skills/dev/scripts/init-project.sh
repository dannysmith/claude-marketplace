#!/bin/bash
# init-project.sh - Phase 1: Deterministic project setup
# Usage: init-project.sh <assets-dir>
#
# Creates task management directories, migrates CLAUDE.md/AGENTS.md to the
# standard layout (CLAUDE.md = pointer, AGENTS.md = content), and copies
# templates for missing files.

set -e

ASSETS_DIR="${1:?Usage: init-project.sh <assets-dir>}"
PROJECT_NAME="$(basename "$(pwd)")"

# --- Helper ---
is_only_content() {
    local file="$1" expected="$2"
    [ -f "$file" ] && [ "$(tr -d '[:space:]' < "$file")" = "$expected" ]
}

# --- A. Create directories ---
mkdir -p docs/tasks-todo docs/tasks-done

# --- B. Migrate CLAUDE.md / AGENTS.md ---
CLAUDE_EXISTS=false; AGENTS_EXISTS=false
CLAUDE_IS_POINTER=false; AGENTS_IS_POINTER=false

[ -f "CLAUDE.md" ] && CLAUDE_EXISTS=true
[ -f "AGENTS.md" ] && AGENTS_EXISTS=true
$CLAUDE_EXISTS && is_only_content "CLAUDE.md" "@AGENTS.md" && CLAUDE_IS_POINTER=true
$AGENTS_EXISTS && is_only_content "AGENTS.md" "@CLAUDE.md" && AGENTS_IS_POINTER=true

if $CLAUDE_EXISTS && $AGENTS_EXISTS; then
    if $CLAUDE_IS_POINTER && ! $AGENTS_IS_POINTER; then
        # Already set up correctly
        echo "CLAUDE.md and AGENTS.md already in correct layout"
    elif $AGENTS_IS_POINTER && ! $CLAUDE_IS_POINTER; then
        # Backwards - swap them
        echo "Swapping CLAUDE.md and AGENTS.md (were backwards)"
        mv AGENTS.md AGENTS.md.bak
        mv CLAUDE.md AGENTS.md
        rm -f AGENTS.md.bak
    elif ! $CLAUDE_IS_POINTER && ! $AGENTS_IS_POINTER; then
        # Both have real content - append CLAUDE.md to AGENTS.md
        echo "Both files have content - appending CLAUDE.md to AGENTS.md"
        printf "\n\n---\n\n" >> AGENTS.md
        cat CLAUDE.md >> AGENTS.md
    fi
    # else: both are pointers somehow - just recreate from templates
elif $CLAUDE_EXISTS && ! $AGENTS_EXISTS; then
    if $CLAUDE_IS_POINTER; then
        # Pointer but no AGENTS.md - create from template
        echo "CLAUDE.md is pointer but AGENTS.md missing - will create from template"
    else
        # Real content - migrate
        echo "Migrating CLAUDE.md -> AGENTS.md"
        mv CLAUDE.md AGENTS.md
    fi
elif ! $CLAUDE_EXISTS && $AGENTS_EXISTS; then
    if $AGENTS_IS_POINTER; then
        # AGENTS.md is just "@CLAUDE.md" with no CLAUDE.md - start fresh
        echo "AGENTS.md was pointer to missing CLAUDE.md - removing, will create from template"
        rm -f AGENTS.md
    else
        echo "AGENTS.md exists, will create CLAUDE.md pointer"
    fi
else
    echo "No existing files - will create both from templates"
fi

# --- C. Add gitkeeps ---
touch docs/tasks-todo/.gitkeep docs/tasks-done/.gitkeep

# --- D. Create CLAUDE.md pointer ---
echo "@AGENTS.md" > CLAUDE.md
echo "CLAUDE.md set to @AGENTS.md"

# --- E. Create AGENTS.md from template if missing ---
if [ ! -f "AGENTS.md" ]; then
    sed "s/{PROJECT_NAME}/$PROJECT_NAME/g" "$ASSETS_DIR/AGENTS.templ.md" > AGENTS.md
    echo "Created AGENTS.md from template"
    echo "CREATED_AGENTS=true"
else
    echo "CREATED_AGENTS=false"
fi

# --- F. Create README.md from template if missing ---
if [ ! -f "README.md" ]; then
    sed "s/{PROJECT_NAME}/$PROJECT_NAME/g" "$ASSETS_DIR/README.templ.md" > README.md
    echo "Created README.md from template"
    echo "CREATED_README=true"
else
    echo "CREATED_README=false"
fi

# --- G. Check for devtask-complete ---
if command -v devtask-complete >/dev/null 2>&1; then
    echo "devtask-complete is available on PATH"
else
    echo "Note: devtask-complete not found on PATH (optional - for completing tasks from the terminal)"
fi

echo ""
echo "Phase 1 complete. Project: $PROJECT_NAME"
