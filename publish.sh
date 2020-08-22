#!/usr/bin/env sh

set -e

if [ -n "$(git status --porcelain)" ]; then
	echo >&2 "There are uncommitted changes."
	exit 1
fi

echo "Running tests..."
npm run test

version="$(jq -r '.version' < package.json)"
echo "Pushing and publishing version $version..."
if git rev-parse "tags/$version" > /dev/null 2>&1; then
	echo >&2 "A tag with this version already exists, perhaps it has been published already?"
	exit 1
fi

npm publish
git tag "$version"
git push --all
