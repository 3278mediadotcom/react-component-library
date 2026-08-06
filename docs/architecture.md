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

The library ships a `ThemeProvider` that:

- Reads the initial theme from `localStorage` (key `rc-library-theme`),
  falling back to the OS `prefers-color-scheme`.
- Toggles the `dark` class on `<html>` so Tailwind's class-based dark variant
  applies.
- Exposes `mode`, `setMode`, and `toggle` via `useTheme()`.

Design tokens live in `src/constants/` and map to the Tailwind palette, so any
host application can re-theme the library by overriding CSS variables.

## Testing strategy

- **Unit tests** (`*.test.tsx`) run in jsdom and assert behavior + accessibility.
- **Story tests** run in a real Chromium browser via the Storybook Vitest
  addon (Playwright). Each story is a testable state of the component.
- **a11y addon** reports violations; CI will fail on `error` level findings.

## CI

See `.github/workflows/ci.yml`. Every pull request runs:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npm run build-storybook`

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
