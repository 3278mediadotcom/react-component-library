# Popover

A positioned overlay that can hold arbitrary content — menus, forms, profile
cards, and more.

## Usage

```tsx
import { Popover } from '../../components/Popover';

<Popover
  placement="bottom"
  closeOnItemClick
  content={
    <ul>
      <li>Profile</li>
      <li>Settings</li>
    </ul>
  }
>
  <Button>User menu</Button>
</Popover>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Popover } from '@react-component-library';
```

## Props

| Prop                  | Type                                     | Default     | Description                                  |
| --------------------- | ---------------------------------------- | ----------- | -------------------------------------------- |
| `children`            | `ReactNode` (single element)             | — (req)     | The trigger element.                         |
| `content`             | `ReactNode`                              | — (req)     | Popover content (arbitrary JSX).             |
| `placement`           | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'`  | Position relative to the trigger.            |
| `closeOnOutsideClick` | `boolean`                                | `true`      | Closes on outside click.                     |
| `closeOnEscape`       | `boolean`                                | `true`      | Closes on Escape.                            |
| `closeOnItemClick`    | `boolean`                                | `false`     | Closes when a button/link inside is clicked. |
| `aria-label`          | `string`                                 | `'Popover'` | Accessible name of the dialog.               |
| `className`           | `string`                                 | —           | Additional panel classes.                    |

## Keyboard shortcuts

| Key      | Action                                            |
| -------- | ------------------------------------------------- |
| `Click`  | Toggles the popover.                              |
| `Tab`    | Moves focus into the panel (focus lands on open). |
| `Escape` | Closes the popover.                               |

## Design decisions

- Toggles via cloning the trigger with `onClick` + `aria-expanded`,
  `aria-haspopup`, and `aria-controls`.
- Panel is always mounted (`open && container`), hidden with `invisible` until
  `useFloatingPosition` computes the anchor — this avoids the classic
  measure-after-mount deadlock.
- Closes on outside click via `useClickOutside`.
- Click-on-item closing checks `event.target.closest('button, a, [role="menuitem"]')`.

## Accessibility

- `role="dialog"` with an accessible name.
- Focus moves into the panel on open.
- Escape and outside-click dismissal are configurable.

## Known limitations

- No collision-flip logic; panels may overflow the viewport near edges.
- Only a single trigger child is supported.
