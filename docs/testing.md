# Testing

## Overview

| Layer | Tool | Scope |
| ----- | ---- | ----- |
| Unit tests | Vitest + React Testing Library | Component behavior + accessibility (jsdom) |
| DOM assertions | @testing-library/jest-dom | ARIA, roles, focus, semantics |
| Interaction | @testing-library/user-event | Keyboard, clicks, focus flows |
| Story tests | Storybook addon-vitest + Playwright | Browser rendering of every story |
| Accessibility | Storybook addon-a11y | Automated a11y checks per story |
| CI | GitHub Actions | Lint → type → unit → build → package smoke test |

## Running tests

```bash
npm run test           # unit tests (31 files, 600+ tests)
npm run test:watch     # watch mode during development
npm run test:coverage  # coverage report (v8)
npm run test:stories   # storybook browser tests
npm run test:all       # unit + storybook projects
```

## Current state

- **600 tests passing** across **31 test files** (v1.0.0).
- Every component ships a `.test.tsx` with behavior and accessibility
  assertions (aria roles, keyboard interaction, focus management).
- Pure utilities are tested in isolation (e.g. `classNames.test.ts`,
  `dataTableUtils.test.ts`).
- DataTable has the deepest suite (53 tests) covering sorting, filtering,
  pagination, selection, column visibility, export, and server-side mode.

## What the tests assert

Beyond happy-path rendering, suites assert:

- **ARIA**: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-sort`,
  `role="combobox"`, `role="switch"`, live regions.
- **Keyboard**: Tab order, arrow-key navigation (Tabs, RadioGroup, Select),
  Escape-to-close (Modal, Drawer, Popover, Toast, Select).
- **Focus**: focus moves into overlays on open and returns to the trigger on
  close.
- **State**: controlled vs uncontrolled behavior via `useControllableState`.
- **Robustness**: disabled states, loading states, empty states, long content.

## CI

`.github/workflows/ci.yml` runs on every push/PR:

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run test`
4. `npm run build`
5. `npm run build-storybook`
6. `npm run build:lib` + `npm pack` + `node .github/scripts/check-package.js`
   (library release verification)

## Test setup

- `src/test/setup.ts` — jest-dom matchers + cleanup.
- `vitest.config.ts` (in `vite.config.ts`) — two projects: `unit` (jsdom) and
  `storybook` (browser via Playwright).
- Test utilities run in jsdom for speed; browser tests are reserved for
  Storybook-level rendering (`npm run test:stories`).
