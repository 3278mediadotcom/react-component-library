# Getting Started

This guide walks through installing `@3278media/react-component-library` in a new
or existing React application.

## Requirements

- **React 18** or later
- **React DOM 18** or later
- A bundler that supports ESM (Vite, Next.js, webpack 5, etc.)

No Tailwind CSS installation or configuration is required.

## Install

```bash
npm install @3278media/react-component-library
```

## Import the stylesheet

The library ships a pre-compiled stylesheet containing every utility class,
theme token, and animation the components need. Import it **once** — preferably
at your app's entry point:

```tsx
// main.tsx / _app.tsx / layout.tsx
import "@3278media/react-component-library/styles.css";
```

Do **not** import from `dist/...` directly — the package `exports` map only
exposes the public entry points.

## Use a component

```tsx
import { Button } from "@3278media/react-component-library";

function SaveForm() {
  return <Button variant="primary">Save</Button>;
}
```

## What is included in the package

| File | Purpose |
| ---- | ------- |
| `dist/index.js` | ESM bundle with all components and hooks |
| `dist/index.d.ts` | TypeScript declarations for the public API |
| `dist/styles.css` | Compiled stylesheet (import once) |
| `README.md`, `LICENSE` | Package metadata |

## Next steps

- Browse the [component inventory](../README.md#available-components)
- Learn about [theming](./theming.md)
- Understand the [accessibility](./accessibility.md) model
- Follow the [release process](./release-process.md) to publish updates
