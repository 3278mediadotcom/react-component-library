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

Dark mode is **automatic** — components ship `dark:` variants that activate
under `@media (prefers-color-scheme: dark)`. No class toggling or configuration
is required.

If you control theming in your app with a class-based strategy instead, you can
customize the stylesheet or override the relevant CSS custom properties under
your own selector.

## Customizing for your product

Three options, from lightest to heaviest touch:

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
