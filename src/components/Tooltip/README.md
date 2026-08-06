# Tooltip

An accessible overlay with `role="tooltip"`, supporting hover (with delay),
keyboard focus, placement, and an arrow.

## Usage

```tsx
import { Tooltip } from '../../components/Tooltip';

<Tooltip content="Copies the selection" placement="top">
  <Button>Copy</Button>
</Tooltip>;
```

> The `children` must be a single element that can receive refs and event
> handlers.

Once package exports land (Phase 5), the import becomes:

```tsx
import { Tooltip } from '@react-component-library';
```

## Props

| Prop        | Type                                     | Default | Description                       |
| ----------- | ---------------------------------------- | ------- | --------------------------------- |
| `children`  | `ReactNode` (single element)             | — (req) | The trigger element.              |
| `content`   | `ReactNode`                              | — (req) | Tooltip content.                  |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to the trigger. |
| `delay`     | `number`                                 | `150`   | Hover delay in ms before showing. |
| `arrow`     | `boolean`                                | `true`  | Shows a pointer arrow.            |
| `disabled`  | `boolean`                                | `false` | Disables the tooltip entirely.    |
| `className` | `string`                                 | —       | Additional tooltip classes.       |

## Design decisions

- **Hover** is delayed (`delay` ms); **keyboard focus** shows immediately —
  the standard interplay so mouse users and keyboard users both get it.
- The tooltip is positioned by `useFloatingPosition` and re-anchored on
  scroll/resize. It renders slightly before measurement then reveals via the
  `invisible` class until the anchor is known.
- Trigger `children` are cloned with `onMouseEnter/Leave` and `onFocus/Blur`,
  and `aria-describedby` is only present while visible.

## Keyboard shortcuts

| Key         | Action                                           |
| ----------- | ------------------------------------------------ |
| `Tab`       | Focuses the trigger → tooltip shows immediately. |
| `Shift+Tab` | Leaves → tooltip hides.                          |

## Accessibility

- `role="tooltip"` and `aria-describedby` describe the trigger.
- Pointer-events-none so the tooltip never intercepts hover.

## Known limitations

- No collision-flip logic yet (tooltips may go off-screen at viewport edges).
- Tooltip cannot contain interactive content by design (it is
  `pointer-events-none`).
