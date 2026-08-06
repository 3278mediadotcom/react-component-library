# Roadmap

A living document describing where the library is headed. Items are ordered by
priority within each milestone.

## Phase 0 — Foundation ✅

- [x] Vite + React + TypeScript scaffold
- [x] Tailwind CSS v4 integration
- [x] Vitest + React Testing Library + jsdom
- [x] Storybook 10 (a11y, docs, vitest, mcp addons)
- [x] ESLint 9 flat config + Prettier
- [x] Folder structure and component contract
- [x] Shared utilities, types, constants
- [x] ThemeContext / ThemeProvider / useTheme
- [x] Docs, CI, README, MIT license

## Phase 1 — Core primitives

- [ ] Button (variants, sizes, loading state, keyboard support)
- [ ] Input (labeling, validation states, accessible error messaging)
- [ ] Card (surface container, header/body/footer slots)
- [ ] Badge (semantic tones)
- [ ] Spinner (indeterminate progress, a11y `role="status"`)

Each component ships with tests, Storybook stories, and an `index.ts` from the
start.

## Phase 2 — Selection & navigation

- [ ] Checkbox
- [ ] RadioGroup
- [ ] Select (custom, keyboard-navigable)
- [ ] Tabs (roving tabindex)
- [ ] Accordion

## Phase 3 — Feedback & overlays

- [ ] Alert / Toast
- [ ] Modal / Dialog (focus trap, Escape handling)
- [ ] Tooltip (hover + focus + keyboard)
- [ ] Popover

## Phase 4 — Data & layout

- [ ] Table (sortable, accessible)
- [ ] Pagination
- [ ] Grid / Flex layout utilities

## Phase 5 — Distribution

- [ ] Package entry points (`package.json` `exports` map)
- [ ] Library build via Vite `lib` mode
- [ ] `dist` artifacts + type declarations
- [ ] Semantic versioning + changelog
- [ ] npm publishing automation (GitHub Release → npm)

## Always

- [ ] Maintain WCAG 2.1 AA compliance on every component
- [ ] Keep story coverage in lockstep with feature work
- [ ] Keep visual regression testing (Playwright) green
