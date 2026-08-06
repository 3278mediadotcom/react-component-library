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

## Components

| Component                                         | Description                                                |
| ------------------------------------------------- | ---------------------------------------------------------- |
| [Button](src/components/Button/README.md)         | Action control with variants, sizes, icons, loading state. |
| [Input](src/components/Input/README.md)           | Accessible text field with labels, validation, icons.      |
| [Card](src/components/Card/README.md)             | Content container with header/body/footer regions.         |
| [Badge](src/components/Badge/README.md)           | Compact semantic status label with dot, pill, and icon.    |
| [Spinner](src/components/Spinner/README.md)       | Indeterminate progress indicator with a11y live region.    |
| [Select](src/components/Select/README.md)         | Accessible combobox with full keyboard support.            |
| [Checkbox](src/components/Checkbox/README.md)     | Checkbox with indeterminate, labels, validation.           |
| [RadioGroup](src/components/RadioGroup/README.md) | Radio group with roving tabindex and arrow keys.           |
| [Switch](src/components/Switch/README.md)         | Accessible on/off toggle with icons and loading state.     |
| [Tabs](src/components/Tabs/README.md)             | Tab interface with roving tabindex and orientations.       |
| [Pagination](src/components/Pagination/README.md) | Page navigation with ellipsis collapsing.                  |
| [Breadcrumb](src/components/Breadcrumb/README.md) | Navigation aid with aria-current="page".                   |
| [Alert](src/components/Alert/README.md)           | Inline message with severity-based live regions.           |
| [Toast](src/components/Toast/README.md)           | Toast provider system with auto-dismiss + hover pause.     |
| [Modal](src/components/Modal/README.md)           | Accessible dialog with portal, focus trap, scroll lock.    |
| [Drawer](src/components/Drawer/README.md)         | Slide-in panel from any edge (4 placements).               |
| [Tooltip](src/components/Tooltip/README.md)       | Accessible tooltip with delay, focus, placement, arrow.    |
| [Popover](src/components/Popover/README.md)       | Positioned overlay for menus, forms, and cards.            |

Every component ships with typed props, tests, Storybook stories, a README,
and a barrel `index.ts`.

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
