# ADR 003 — CSS Distribution (Shipping Compiled Tailwind)

## Status

Accepted.

## Decision

The package ships a single compiled stylesheet (`dist/styles.css`) produced by
`npm run build:lib` (Tailwind v4 via `@tailwindcss/vite`).

- `src/lib.ts` imports `./index.css` and re-exports the public API.
- `vite-plugin-dts` + `tsconfig.lib.json` generate declarations.
- Consumers import the CSS once:

  ```tsx
  import "@3278media/react-component-library/styles.css";
  ```

- React and React DOM remain `external` in the Rollup config so consumers keep
  a single React copy.

## Reasoning

- Consumers should not need Tailwind, a build step, or configuration to use
  the components — this is what makes the package installable in any React
  app.
- Keeping React external prevents duplicate-hook bugs.
- The `exports` map exposes only the package root and `./styles.css`, blocking
  deep imports of internals.

## Tradeoffs

- The compiled CSS is fixed at publish time; consumers who want to fully
  re-theme must override CSS custom properties or fork the source.
- The showcase build (`npm run build`) and the library build (`npm run
  build:lib`) share `dist/`, so `build:lib` must run last before `npm pack`.
