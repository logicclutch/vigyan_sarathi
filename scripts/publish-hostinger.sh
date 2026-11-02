#!/usr/bin/env bash
# Builds the site and publishes the built files to the `hostinger` branch of the GitHub repository.
# Hostinger hPanel (Advanced → Git) deploys that branch into public_html. Usage:
#   VITE_SITE_URL=https://your-domain.in npm run deploy:hostinger
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="${DEPLOY_REMOTE:-git@github.com:logicclutch/vigyan_sarathi.git}"
BRANCH="${DEPLOY_BRANCH:-hostinger}"

npm run build
rm -rf .deploy
mkdir .deploy
cp -R dist/. .deploy/
cd .deploy
git init -q
git checkout -q -b "$BRANCH"
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-$(git -C .. config user.name)}" -c user.email="${GIT_AUTHOR_EMAIL:-$(git -C .. config user.email)}" \
  commit -q -m "Deploy built site $(date -u +%Y-%m-%dT%H:%MZ) from $(git -C .. rev-parse --short HEAD)"
git push -f "$REMOTE" "$BRANCH:$BRANCH"
cd ..
rm -rf .deploy
echo "Published dist/ to $REMOTE ($BRANCH)"
