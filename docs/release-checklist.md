# Release Checklist

Use this checklist before every release of `@3278media/react-component-library`.
For the full procedure, see [release-process.md](./release-process.md).

## Before release

- [ ] Working tree is clean: `git status`
- [ ] On `main` with the latest changes pulled
- [ ] CI is green on `main` (lint, type check, tests, builds, package verification)
- [ ] `CHANGELOG.md` is updated for the new version
- [ ] README reflects the current component inventory and API

## Verification gates

> **IMPORTANT — shared `dist/`**: the showcase build (`npm run build`) and the
> library build (`npm run build:lib`) both write to `dist/`, so **always run
> `npm run build:lib` last** (immediately before `npm pack`). `prepublishOnly`
> already enforces this order on publish.

- [ ] `npm run lint` — no ESLint errors
- [ ] `npm test` — all unit tests pass
- [ ] `npm run build` — showcase app builds
- [ ] `npm run build-storybook` — Storybook builds
- [ ] `npm run build:lib` **LAST** — library dist is fresh (`index.js`, `index.d.ts`, `styles.css`) and not overwritten by the showcase build
- [ ] `npm pack` — creates the tarball (run immediately after `build:lib`)
- [ ] `node .github/scripts/check-package.js` — tarball contains required files, no leakage
- [ ] Consumer validation: install the `.tgz` into `consumer-test/` and confirm imports, CSS, and types work

## Version bump

- [ ] `npm version patch` (or `minor`/`major`) — updates version, creates tag + commit
- [ ] `git push && git push --tags`

## Publish

- [ ] `npm publish --access public` (`.npmrc` already sets `access=public`)
  - `prepublishOnly` runs lint + unit tests + library build automatically
- [ ] Verify the package appears on npm at
  https://www.npmjs.com/package/@3278media/react-component-library

## Post-release

- [ ] Create a GitHub release for `vX.Y.Z`
  - Title: version
  - Notes: copy the `CHANGELOG.md` entry
  - Optional: attach the tarball
- [ ] Announce the release (changelog channel, etc.)
- [ ] Update `docs/roadmap.md` with next steps

## Rollback (only if needed)

- [ ] Prefer a patch release with a fix over unpublishing
- [ ] If unpublishing is unavoidable, use `npm unpublish <pkg>@<version>` and document