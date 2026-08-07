# Release Process

This document describes the step-by-step process for publishing a new version of
`@3278media/react-component-library` to npm.

> **Do not publish during feature development.** Releases are gated by the
> [release checklist](./release-checklist.md) and the automated `prepublishOnly`
> script.

## When to release

| Change type | Version bump |
| ----------- | ------------ |
| Breaking API changes | `major` |
| New backwards-compatible features | `minor` |
| Bug fixes / docs / internal changes | `patch` |

## Prerequisites

- You are on `main` with a clean working tree (`git status`).
- The GitHub Actions CI is green (lint, tests, build, Storybook, package checks).
- The [release checklist](./release-checklist.md) has been reviewed.

## Steps

### 1. Bump the version

```bash
npm version patch   # or minor / major
```

This:

- Updates `package.json` / `package-lock.json`
- Creates a `vX.Y.Z` git tag
- Creates a version commit

### 2. Run the full verification

```bash
npm run lint
npm test
npm run build
npm run build-storybook
npm run build:lib
npm pack
```

Inspect the tarball (see the CI smoke-test script at
`.github/scripts/check-package.js` for the expected contents):

```
package/dist/index.js
package/dist/index.d.ts
package/dist/styles.css
package/README.md
package/LICENSE
package/package.json
```

### 3. Validate in a consumer app

Install the tarball into a fresh app (see `consumer-test/` in the parent
directory of this repo) and verify:

- Component imports work
- `import "@3278media/react-component-library/styles.css"` applies styles
- TypeScript autocomplete works against the shipped declarations
- React peer dependency resolves to a single copy

### 4. Push and tag

```bash
git push && git push --tags
```

The version commit and `vX.Y.Z` tag are now on the remote.

### 5. Publish to npm

```bash
npm publish --access public
```

The `prepublishOnly` script automatically runs `lint`, unit tests, and the
library build before publishing. If any of those fail, the publish is aborted.

### 6. Create a GitHub release

- Tag: `vX.Y.Z`
- Follow [Keep A Changelog](../CHANGELOG.md) structure for the release notes
- Include migration notes for breaking changes
- Attach the tarball (`3278media-react-component-library-<version>.tgz`) if desired

### 7. Announce

- Update the README badges if the repo/package metadata changed
- Note the release in your team's changelog channel
- Update the roadmap in `docs/roadmap.md`

## Publishing a scoped package

The package is scoped (`@3278media/`). `.npmrc` at the repo root sets
`access=public`, so `npm publish` works without the `--access` flag on every
run. Publishing to the private registry or an alternate scope requires
adjusting `.npmrc`.

## Rollback

If a bad version is published:

1. Do **not** unpublish immediately if the version is already in use — prefer a
   patch release with a fix.
2. If unpublishing is necessary (accidental secrets, etc.), follow npm's
   unpublish policy (`npm unpublish <pkg>@<version>`) and document the event.

## Automation

- **CI package smoke test** — `.github/scripts/check-package.js` runs on every
  push/PR and fails the build if the tarball is missing required files or leaks
  source/test files.
- **`prepublishOnly`** — runs `npm run lint && npm test && npm run build:lib`
  automatically on `npm publish`.