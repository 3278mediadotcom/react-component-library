# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0]

### Added

- 29 production React components across forms, navigation, feedback, data
  display, and layout categories.
- TypeScript support with fully typed props, generic `DataTable<Row>`, and
  generated `.d.ts` declarations shipped in the package.
- Storybook 10 documentation with stories for every component, a11y and vitest
  integration.
- Accessibility features: focus traps, roving tabindex, ARIA patterns, and live
  regions on every component.
- DataTable system: sorting, filtering, pagination, selection, column
  visibility, CSV export, and server-side mode.
- Overlay system: Modal, Drawer, Popover, Tooltip, and Toast with portals,
  scroll lock, and entrance animations.
- CSS distribution: compiled `styles.css` ships with the package; consumers do
  not need Tailwind or build configuration.
- npm package support: ESM output, React externalized as peer dependencies,
  protected `exports` map.

### Developer Experience

- Vite library build (`npm run build:lib`) producing `dist/index.js`,
  `dist/index.d.ts`, and `dist/styles.css`.
- Generated TypeScript declarations via `vite-plugin-dts`.
- Consumer validation (`consumer-test/`) verifying the packed artifact from a
  real app.
- CI package checks: tarball smoke test validates required files and blocks
  source/test leakage.

### Security

- React and React DOM declared as peer dependencies (no duplicate React).
- Package `exports` map protects internals; deep imports are blocked.
- `prepublishOnly` gate runs lint, tests, and the library build before publish.