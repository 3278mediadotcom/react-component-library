# Drawer

A slide-in panel from any edge, sharing Modal's overlay infrastructure
(portal, focus trap, Escape, backdrop, scroll lock).

## Usage

```tsx
import { Drawer } from '../../components/Drawer';

<Drawer open={open} onClose={() => setOpen(false)} placement="right" title="Cart">
  <p>Drawer content</p>
</Drawer>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Drawer } from '@react-component-library';
```

## Props

| Prop              | Type                                     | Default          | Description                     |
| ----------------- | ---------------------------------------- | ---------------- | ------------------------------- |
| `open`            | `boolean`                                | —                | Controlled open state.          |
| `defaultOpen`     | `boolean`                                | `false`          | Initial state (uncontrolled).   |
| `onClose`         | `() => void`                             | —                | Fired on close request.         |
| `children`        | `ReactNode`                              | — (req)          | Drawer content.                 |
| `title`           | `ReactNode`                              | —                | Accessible title.               |
| `closeOnBackdrop` | `boolean`                                | `true`           | Closes on backdrop click.       |
| `closeOnEscape`   | `boolean`                                | `true`           | Closes on Escape.               |
| `showCloseButton` | `boolean`                                | `true`           | Shows a header close button.    |
| `closeLabel`      | `string`                                 | `'Close drawer'` | Accessible close label.         |
| `lockScroll`      | `boolean`                                | `true`           | Locks body scroll.              |
| `placement`       | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'`        | Slide-in edge.                  |
| `width`           | `string`                                 | `'w-80'`         | Width (horizontal placements).  |
| `height`          | `string`                                 | `'h-64'`         | Height (top/bottom placements). |
| `className`       | `string`                                 | —                | Overlay classes.                |

## Keyboard shortcuts

| Key                 | Action                          |
| ------------------- | ------------------------------- |
| `Tab` / `Shift+Tab` | Focus is trapped in the drawer. |
| `Escape`            | Closes the drawer.              |

## Design decisions

- Reuses the same overlay toolkit as Modal: `usePortal`, `trapFocus`,
  `useEscapeKey`, `useScrollLock`.
- Placement is a data-driven class map; the animation is selected per edge
  (left/right/top/bottom keyframes defined in the theme).
- Focus moves to the first focusable element on open and returns to the
  trigger on close.

## Accessibility

- `role="dialog"` + `aria-modal="true"` (same semantics as Modal).
- Title wired via `aria-labelledby`.

## Known limitations

- Entrance animations only (no exit animation yet).
