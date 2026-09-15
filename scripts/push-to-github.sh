#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-ashleygohportfolio}"

if [[ -n "${GH_TOKEN:-}" ]]; then
  echo "$GH_TOKEN" | gh auth login --with-token
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated."
  echo "Run: gh auth login -h github.com -p https -w"
  echo "Or set GH_TOKEN with repo scope and rerun this script."
  exit 1
fi

USER="$(gh api user -q .login)"
REMOTE="https://github.com/${USER}/${REPO_NAME}.git"

if gh repo view "${USER}/${REPO_NAME}" >/dev/null 2>&1; then
  echo "Repository ${USER}/${REPO_NAME} already exists."
else
  gh repo create "${REPO_NAME}" --public --description "Ashley Goh — UX research portfolio"
  echo "Created https://github.com/${USER}/${REPO_NAME}"
fi

if git remote get-url github >/dev/null 2>&1; then
  git remote set-url github "${REMOTE}"
else
  git remote add github "${REMOTE}"
fi

git push -u github main
echo "Pushed main to ${REMOTE}"
