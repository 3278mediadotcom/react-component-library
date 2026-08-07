# Architecture

This document describes the high-level architecture of the React Component Library.

## Goals

- **Production-ready components** with accessibility, theming, and TypeScript
  from day one.
- **Consistent component API** so consumers can predict how each component
  behaves.
- **Investable code**: every component is built with tests, Storybook stories,
  and documentation as part of the same unit.

## Toolchain

| Layer          | Tool                                       | Role                                            |
| -------------- | ------------------------------------------ | ----------------------------------------------- |
| Build          | Vite 5 + @vitejs/plugin-react              | Dev server, HMR, production bundling            |
| Language       | TypeScript                                 | Static types for component APIs                 |
| Styling        | Tailwind CSS v4 (@tailwindcss/vite)        | Utility-first styling, dark-mode via class      |
| Unit testing   | Vitest + React Testing Library + jsdom     | Component behavior and accessibility assertions |
| Visual testing | Storybook 10 + Playwright + addon-vitest   | Stories as living documentation + browser tests |
| Linting        | ESLint 9 (flat config) + typescript-eslint | Code quality and React hooks rules              |
| Formatting     | Prettier + eslint-config-prettier          | Consistent formatting, no style debates         |
| CI             | GitHub Actions                             | Lint → test → build → build-storybook on PR     |

## Folder structure

```text
src/
  components/          # One folder per component
    Button/
      Button.tsx       # Implementation
      Button.types.ts  # Props for the component
      Button.test.tsx  # Unit tests
      Button.stories.tsx # Storybook stories
      index.ts         # Public entry (re-exports)
  hooks/               # Shared hooks (useTheme, ...)
  utils/               # Pure helpers (classNames, keyboard, accessibility)
  types/               # Shared TypeScript types
  constants/           # Design tokens (colors, sizes, spacing)
  contexts/            # React contexts (ThemeContext)
  providers/           # Provider components (ThemeProvider)
  styles/              # Global CSS and theme configuration
  icons/               # SVG icon components
  lib/                 # Framework-facing helpers (component factories)
```

## Component contract

Every component follows the same structure (see `src/components/Button`):

```text
Button/
  Button.tsx
  Button.types.ts
  Button.test.tsx
  Button.stories.tsx
  index.ts
```

Rules:

1. **Types live in a separate file** so they can be imported without pulling in
   the implementation.
2. **`index.ts` is the single public entry**; consumers import from
   `components/Button`, never from `Button.tsx` directly.
3. **Props extend the native HTML props** for the underlying element where it
   makes sense (`ButtonHTMLAttributes`, `InputHTMLAttributes`, ...).
4. **Ref forwarding** is supported for form components.
5. **Accessibility is non-negotiable**: correct ARIA, keyboard support, focus
   management, color contrast.

## Theming

The library ships a complete design system in `dist/styles.css`, compiled from
`src/index.css` (Tailwind CSS v4):

- **Tokens** live in the source `@theme` block (`src/index.css`) and compile to
  native CSS custom properties (`--color-*`, `--text-*`, `--radius-*`,
  `--animate-*`, ...).
- **Dark mode is automatic** — components ship `dark:` variants that activate
  under `@media (prefers-color-scheme: dark)`. No host configuration needed.
- **Custom animations** (modal, drawer, toast, skeleton, progress) declare
  their keyframes in the theme and ship with the CSS.
- A `ThemeProvider` + `useTheme()` source hook remains available for apps that
  want a React-level `mode`/`toggle` API; it defaults to the OS preference.

Consumers can re-theme the library by overriding the CSS custom properties:

```css
:root {
  --color-blue-600: #4f46e5;
}
```

## Testing strategy

- **Unit tests** (`*.test.tsx`) run in jsdom and assert behavior + accessibility.
- **Story tests** run in a real Chromium browser via the Storybook Vitest
  addon (Playwright). Each story is a testable state of the component.
- **a11y addon** reports violations; CI will fail on `error` level findings.

## CI

See `.github/workflows/ci.yml`. Two jobs run on every push/PR:

**`lint-test-build`**:
1. `npm run lint`
2. `npx tsc --noEmit` (type check)
3. `npm run test` (600 unit tests)
4. `npm run build`
5. `npm run build-storybook`

**`package-check`** (library release verification):
1. `npm run build:lib`
2. `npm pack`
3. `node .github/scripts/check-package.js` — validates required files exist and
   no source/test/config files leak into the tarball.

`.github/workflows/pages.yml` deploys the static Storybook build to GitHub
Pages on every push to `main`.

## Commands

| Script                    | Purpose                       |
| ------------------------- | ----------------------------- |
| `npm run dev`             | Start Vite dev server         |
| `npm run build`           | Type-check + production build |
| `npm run preview`         | Preview the production build  |
| `npm run lint`            | ESLint (flat config)          |
| `npm run format`          | Prettier (write mode)         |
| `npm run test`            | Vitest (jsdom unit tests)     |
| `npm run test:unit`       | Alias for `npm run test`      |
| `npm run storybook`       | Storybook dev server          |
| `npm run build-storybook` | Static Storybook build        |
