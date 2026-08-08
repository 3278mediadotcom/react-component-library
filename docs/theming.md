# Theming

The design system ships inside `dist/styles.css`, compiled from the source
`src/index.css` (Tailwind CSS v4). Consumers get a complete design system with
zero configuration.

## How the stylesheet is built

`src/index.css` contains:

```css
@import 'tailwindcss';

@theme {
  /* custom animation tokens */
  --animate-overlay-in: overlay-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
  /* ... */
}
```

During `npm run build:lib`, Tailwind scans the source components for utility
classes, emits the ones actually used, and bundles them — along with the theme
tokens and keyframes — into a single `dist/styles.css`.

## CSS custom properties

Tailwind v4 exposes its theme as native CSS custom properties in a
`@layer theme`:

| Token | Purpose |
| ----- | ------- |
| `--color-*` | Color palette (blue, slate, red, green, amber, sky, white) |
| `--spacing` | Base spacing unit (0.25rem); utilities multiply this |
| `--text-*` | Font-size scale (`--text-sm`, `--text-lg`, ...) |
| `--font-*` | Font family tokens (`--font-sans`, `--font-mono`) |
| `--radius-*` | Border radius scale (`--radius-md`, `--radius-lg`, `--radius-xl`) |
| `--ease-*` | Transition easing curves |
| `--animate-*` | Named animations (see below) |

These are real CSS variables, so you can override them at runtime:

```css
:root {
  --color-blue-600: #1d4ed8; /* recolor the primary action */
}
```

## Custom animations

The theme registers the following animations, used by the overlay and feedback
components:

| Token | Animation | Used by |
| ----- | --------- | ------- |
| `--animate-overlay-in` | `overlay-in` | Modal, Drawer, Popover backdrops |
| `--animate-modal-in` | `modal-in` | Modal panel |
| `--animate-drawer-in-left/right/top/bottom` | `drawer-in-*` | Drawer placements |
| `--animate-toast-in` | `toast-in` | Toast entries |
| `--animate-pop` | `pop` | Popover/Tooltip |
| `--animate-skeleton-wave` | `skeleton-wave` | Skeleton wave variant |
| `--animate-progress-indeterminate` | `progress-indeterminate` | Progress indeterminate |

All keyframes are included in the shipped CSS and respect
`prefers-reduced-motion`.

## Dark mode

Dark mode uses an **opt-in class-based strategy**. Components ship `dark:`
variants that activate when a `.dark` class is present on the `<html>` element —
the stylesheet registers this with `@custom-variant dark` in `src/index.css`.
No OS-level `prefers-color-scheme` query is used, so light/dark does not depend
on the user's system setting.

### ThemeProvider

The library ships a `ThemeProvider` that manages the theme for you:

- Applies/removes the `.dark` class on `<html>` when the mode changes.
- Seeds the initial mode from `localStorage`, then from
  `window.matchMedia('(prefers-color-scheme: dark)')`, falling back to `light`.
- Persists the user's choice to `localStorage` (`rc-library-theme` by default).

Wrap your tree with it:

```tsx
import { ThemeProvider } from "@3278media/react-component-library";

function App() {
  return <ThemeProvider>{/* components */}</ThemeProvider>;
}
```

Read or change the mode anywhere below the provider with `useTheme()`:

```tsx
import { useTheme } from "@3278media/react-component-library";

function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return (
    <button onClick={toggle}>
      Switch to {mode === "dark" ? "light" : "dark"}
    </button>
  );
}
```

`ThemeProvider` accepts `initialMode` and `storageKey` props to customize the
fallback theme and the persistence key.

### Customizing for your product

If you do not want to use the provider, you can drive the `.dark` class
yourself (e.g. in a layout route or an inline script) — components will respond
to whatever element toggles it. The remaining customization options are
unchanged:

1. **Override CSS variables** — recolor tokens via `:root` in your app CSS:

   ```css
   :root {
     --color-blue-600: #4f46e5;
     --radius-lg: 0.75rem;
   }
   ```

2. **Prepend additional CSS** — import your own stylesheet before or after the
   library styles to add component overrides.

3. **Fork the theme** — edit `src/index.css` in this repository and rebuild the
   library (`npm run build:lib`). The published stylesheet reflects your tokens.

## Semantic colors used by components

| Semantic role | Default token |
| ------------- | ------------- |
| Primary / info | `--color-blue-*` (500/600/700) |
| Success | `--color-green-*` (500/600/700) |
| Danger / error | `--color-red-*` (500/600/700) |
| Warning | `--color-amber-*` (500/600/700) |
| Neutral / secondary | `--color-slate-*` (500/600/700) |
| Backgrounds | `--color-white`, `--color-slate-50` |
