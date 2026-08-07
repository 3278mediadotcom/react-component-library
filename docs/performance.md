# Performance

## Bundle size

Measured from `npm run build:lib` (v1.0.0):

| Artifact | Size | Gzip |
| -------- | ---- | ---- |
| `dist/index.js` (ESM bundle) | 130.18 kB | 30.61 kB |
| `dist/styles.css` (compiled Tailwind v4) | 53.50 kB | 9.79 kB |
| `dist/index.d.ts` (declarations) | 4.4 kB | — |

The consumer build in `consumer-test/` (library + demo) totals:

| Output | Size | Gzip |
| ------ | ---- | ---- |
| JS bundle (React 18 + library + demo) | 190.11 kB | 59.67 kB |
| CSS (library stylesheet) | 53.50 kB | 9.79 kB |

## Tree shaking

Enabled by the ESM-only output (`formats: ["es"]`) and the flat `exports` map.
Bundlers that support ESM tree-shaking (Vite, webpack 5, Rollup, esbuild) can
drop unused components from the final bundle.

## React

React and React DOM are **external** — declared as peer dependencies and never
bundled. Consumers keep a single React copy (verified with `npm ls react` in
`consumer-test`: `react@18.3.1 deduped`). This prevents duplicate-hook bugs and
keeps the package lean.

## CSS footprint

`dist/styles.css` contains only the utilities actually used by the components
(Tailwind v4 scans source during `build:lib`), plus:

- Theme tokens (`@layer theme`)
- Preflight/base styles (`@layer base`)
- Custom keyframes (modal, drawer, toast, pop, skeleton, progress)

Consumers import it once; no runtime CSS-in-JS overhead.

## Rendered DOM

Components use semantic elements with no wrapper-heavy abstractions:

- `Button` → single `<button>`
- `Modal`/`Drawer` → portal + overlay + panel (3 nodes)
- `DataTable` → semantic `<table>` with `<caption>`/`<thead>`/`<tbody>`

The library ships no third-party runtime dependencies (`dependencies: {}` in
package.json).

## Animation

All animations are CSS-based (200–300 ms) and disabled under
`prefers-reduced-motion`, so there is no JavaScript animation cost.
