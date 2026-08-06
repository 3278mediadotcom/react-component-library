# react-component-library

Production-ready React component library built with TypeScript, accessibility,
testing, Storybook, and modern frontend engineering practices.

## Features

- ⚛️ **React 18 + TypeScript** — strict mode, ref forwarding, robust APIs
- 🎨 **Tailwind CSS v4** — utility-first styling with class-based dark mode
- 🧪 **Vitest + React Testing Library** — behavior and accessibility assertions
- 📚 **Storybook 10** — living documentation with a11y, docs, and vitest addons
- 🔍 **ESLint 9 + Prettier** — enforced code quality and consistent formatting
- 🤖 **GitHub Actions** — CI runs lint, tests, build, and Storybook on every PR
- ♿ **WCAG-aware** — every component ships with keyboard support and ARIA

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Storybook

```bash
npm run storybook
```

## Scripts

| Script                    | Purpose                             |
| ------------------------- | ----------------------------------- |
| `npm run dev`             | Start the Vite dev server           |
| `npm run build`           | Type-check and build for production |
| `npm run preview`         | Preview the production build        |
| `npm run lint`            | ESLint (flat config)                |
| `npm run format`          | Prettier (write mode)               |
| `npm run test`            | Vitest unit tests (jsdom)           |
| `npm run storybook`       | Storybook dev server                |
| `npm run build-storybook` | Static Storybook build              |

## Project structure

```text
src/
  components/    # One folder per component (tsx, types, test, stories, index)
  hooks/         # Shared hooks
  utils/         # Pure helpers (classNames, keyboard, accessibility)
  types/         # Shared TypeScript types
  constants/     # Design tokens (colors, sizes, spacing)
  contexts/      # React contexts
  providers/     # Provider components
  styles/        # Global styles and theme configuration
  icons/         # SVG icon components
  lib/           # Framework-facing helpers
docs/            # Architecture, contributing, roadmap
tests/           # Shared test utilities (setup files, fixtures)
```

## Documentation

- [Architecture](docs/architecture.md)
- [Contributing](docs/contributing.md)
- [Roadmap](docs/roadmap.md)

## License

[MIT](LICENSE)
