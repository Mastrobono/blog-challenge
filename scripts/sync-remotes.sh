#!/bin/bash

# Script to push to GitLab and GitHub simultaneously
# Usage: ./scripts/sync-remotes.sh [branch-name]
# If no branch is specified, uses the current branch

BRANCH=${1:-$(git branch --show-current)}

echo "🔄 Syncing branch: $BRANCH"
echo ""

# Push to GitLab (origin)
echo "📤 Pushing to GitLab (origin)..."
if git push origin $BRANCH; then
    echo "✅ GitLab sync successful"
else
    echo "❌ GitLab sync failed"
    exit 1
fi

echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
if git push github $BRANCH; then
    echo "✅ GitHub sync successful"
else
    echo "❌ GitHub sync failed"
    exit 1
fi

echo ""
echo "🎉 Both remotes synced successfully!"

