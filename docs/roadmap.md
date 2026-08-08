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

## Phase 1 — Core primitives ✅

- [x] Button (variants, sizes, loading state, keyboard support)
- [x] Input (labeling, validation states, accessible error messaging)
- [x] Card (surface container, header/body/footer slots)
- [x] Badge (semantic tones)
- [x] Spinner (indeterminate progress, a11y `role="status"`)

Each component ships with tests, Storybook stories, a README, and an `index.ts`
from the start.

## Phase 2 — Selection & navigation ✅

- [x] Select (combobox with full keyboard support + type-ahead)
- [x] Checkbox (indeterminate, labels, validation)
- [x] RadioGroup (roving tabindex, arrow keys, orientation)
- [x] Switch (role="switch", loading, icons)
- [x] Tabs (roving tabindex, horizontal/vertical, disabled, icons)
- [x] Pagination (ellipsis collapsing)
- [x] Breadcrumb (aria-current="page")

## Phase 3 — Feedback & overlays ✅

- [x] Alert (severity-based role selection)
- [x] Toast provider system (auto-dismiss, pause-on-hover, stacking)
- [x] Modal (portal, focus trap, ESC, backdrop, scroll lock, focus restore)
- [x] Drawer (4 placements, shared overlay infra)
- [x] Tooltip (hover delay + focus, placement, arrow)
- [x] Popover (click outside, ESC, placement, portal)

## Phase 4 — Data display & layout ✅

- [x] Table (semantic wrapper: density, stripes, hover, sticky header, footer)
- [x] DataTable (flagship: sorting, filtering, pagination, selection,
      loading/empty states, column visibility, CSV export, server-side mode,
      controlled/uncontrolled)
- [x] Accordion (single/multiple, controlled/uncontrolled, disabled, animations)
- [x] Avatar (image → initials → icon fallback, status dot, shapes, sizes)
- [x] AvatarGroup (overlap, overflow chip, optional tooltips)
- [x] Progress (linear/circular, determinate/indeterminate, `role="progressbar"`)
- [x] Skeleton (text/avatar/button/card/image, pulse/wave)
- [x] EmptyState (illustration, title, description, actions)
- [x] Divider (horizontal/vertical, centered label)
- [x] Stack (flexbox layout primitive)
- [x] Grid (responsive columns, auto-fit/fill, custom templates)
- [x] Shared hooks (useSorting, usePagination, useSelection, useDebounce,
      useResizeObserver)

## Phase 5 — Distribution ✅

- [x] Package entry points (`package.json` `exports` map)
- [x] Library build via Vite `lib` mode
- [x] `dist` artifacts + type declarations
- [x] Semantic versioning + changelog
- [ ] npm publishing automation (GitHub Release → npm)

## Always

- [x] Maintain WCAG 2.1 AA compliance on every component
- [x] Keep story coverage in lockstep with feature work
- [ ] Keep visual regression testing (Playwright) green
