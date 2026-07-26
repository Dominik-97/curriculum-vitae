#!/bin/bash

# =============================================================================
# Deploy Redirect Page to GitHub Pages
# Usage: ./scripts/deploy-redirect.sh [NEW_URL]
#   NEW_URL - The URL to redirect to (default: https://cv.yourdomain.com)
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NEW_URL="${1:-https://cv.yourdomain.com}"
GH_PAGES_BRANCH="gh-pages"
REPO_DIR="$(git rev-parse --show-toplevel)"

# Print header
echo -e "${BLUE}"
echo "=========================================================================="
echo "  Deploy Redirect Page to GitHub Pages"
echo "=========================================================================="
echo -e "${NC}"
echo -e "New URL: ${GREEN}${NEW_URL}${NC}"
echo -e "Target branch: ${GREEN}${GH_PAGES_BRANCH}${NC}"
echo ""

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo -e "${RED}✗ Not in a git repository${NC}"
    exit 1
fi

# Create temporary directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf ${TEMP_DIR}" EXIT

# Create the redirect page with the actual URL
sed "s|https://cv.yourdomain.com|${NEW_URL}|g" "${REPO_DIR}/static-redirect.html" > "${TEMP_DIR}/index.html"

# Create .nojekyll to disable Jekyll processing
touch "${TEMP_DIR}/.nojekyll"

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Switch to gh-pages branch
if git show-ref --verify --quiet refs/heads/${GH_PAGES_BRANCH}; then
    echo -e "${YELLOW}Switching to existing ${GH_PAGES_BRANCH} branch...${NC}"
    git checkout ${GH_PAGES_BRANCH}
else
    echo -e "${YELLOW}Creating new ${GH_PAGES_BRANCH} branch...${NC}"
    git checkout --orphan ${GH_PAGES_BRANCH}
fi

# Remove all existing files except .git
if [ "$(git ls-files | wc -l)" -gt 0 ]; then
    git rm -r --ignore-unmatch . 2>/dev/null || true
fi

# Add new files
cp "${TEMP_DIR}/index.html" .
cp "${TEMP_DIR}/.nojekyll" .
git add index.html .nojekyll

# Commit changes
git commit -m "Update redirect page to ${NEW_URL}"

# Push to remote
if git push origin ${GH_PAGES_BRANCH} --force; then
    echo -e "${GREEN}✓ Redirect page deployed to ${GH_PAGES_BRANCH} branch${NC}"
    echo ""
    echo -e "The redirect page is now live at:"
    echo -e "  ${GREEN}https://$(git remote get-url origin | sed 's/.*github.com[:/]//;s/\.git$//').github.io/curriculum-vitae/${NC}"
    echo ""
    echo -e "It will automatically redirect to: ${GREEN}${NEW_URL}${NC}"
else
    echo -e "${RED}✗ Failed to push to ${GH_PAGES_BRANCH}${NC}"
    exit 1
fi

# Switch back to original branch
git checkout ${CURRENT_BRANCH}

echo -e "${GREEN}✓ Deployment complete!${NC}"
