#!/bin/bash
# Auto-deploy the Widget Container demo to GitHub Pages (branch-aware).
#
# Watched file: <checkout>/Widget Container Demo/index.html
# Publishes to whatever branch THIS checkout is on:
#   - main clone     -> pushes main
#   - phase-2 worktree -> pushes phase-2 (drives the /phase-2 preview via Actions)
# Flow: commit -> pull --rebase (same branch) -> push (same branch). Never resets.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel)"
BRANCH="$(git -C "$REPO" rev-parse --abbrev-ref HEAD)"
FILE="Widget Container Demo/index.html"
LOG="/tmp/widget-container-deploy.log"
ts() { date '+%Y-%m-%d %H:%M:%S'; }

cd "$REPO" || { echo "$(ts): repo not found: $REPO" >>"$LOG"; exit 1; }
echo "$(ts): triggered in $REPO (branch $BRANCH)" >>"$LOG"

# Clear stale locks (worktree-safe path resolution)
rm -f "$(git rev-parse --git-path index.lock)" "$(git rev-parse --git-path HEAD.lock)" 2>/dev/null

git add "$FILE"
if git diff --cached --quiet; then
  echo "$(ts): no changes" >>"$LOG"
  exit 0
fi

git commit -m "widget demo update $(ts)" >>"$LOG" 2>&1

# Integrate anyone else's changes on the SAME branch before pushing
if ! git pull --rebase origin "$BRANCH" >>"$LOG" 2>&1; then
  git rebase --abort >>"$LOG" 2>&1
  echo "$(ts): !!! MERGE CONFLICT on $FILE ($BRANCH) — committed locally but NOT pushed. Run 'git pull --rebase' in $REPO and resolve." >>"$LOG"
  osascript -e 'display notification "Widget demo: merge conflict, not pushed. See /tmp/widget-container-deploy.log" with title "Widget watcher"' 2>/dev/null
  exit 1
fi

git push origin "$BRANCH" >>"$LOG" 2>&1 && echo "$(ts): deployed OK ($BRANCH)" >>"$LOG"
