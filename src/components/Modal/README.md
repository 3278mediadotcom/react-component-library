# Modal

An accessible dialog rendered in a portal, with focus management, scroll lock,
Escape/backdrop dismissal, and controlled/uncontrolled usage.

## Usage

```tsx
import { Modal } from '../../components/Modal';

<Modal open={open} onClose={() => setOpen(false)} title="Settings">
  <p>Dialog content</p>
</Modal>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Modal } from '@react-component-library';
```

## Props

| Prop              | Type                           | Default          | Description                                  |
| ----------------- | ------------------------------ | ---------------- | -------------------------------------------- |
| `open`            | `boolean`                      | —                | Controlled open state.                       |
| `defaultOpen`     | `boolean`                      | `false`          | Initial state for uncontrolled usage.        |
| `onClose`         | `() => void`                   | —                | Fired when the modal requests to close.      |
| `children`        | `ReactNode`                    | — (req)          | Dialog content.                              |
| `title`           | `ReactNode`                    | —                | Accessible title (`aria-labelledby`).        |
| `description`     | `ReactNode`                    | —                | Accessible description (`aria-describedby`). |
| `closeOnBackdrop` | `boolean`                      | `true`           | Closes when the backdrop is clicked.         |
| `closeOnEscape`   | `boolean`                      | `true`           | Closes on Escape.                            |
| `showCloseButton` | `boolean`                      | `true`           | Shows a header close button.                 |
| `closeLabel`      | `string`                       | `'Close dialog'` | Accessible close-button label.               |
| `lockScroll`      | `boolean`                      | `true`           | Locks body scroll while open.                |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`           | Panel width.                                 |
| `className`       | `string`                       | —                | Overlay classes.                             |

## Keyboard shortcuts

| Key                 | Action                                   |
| ------------------- | ---------------------------------------- |
| `Tab` / `Shift+Tab` | Moves focus within the dialog (trapped). |
| `Escape`            | Closes the dialog.                       |

## Design decisions

- Rendered through a **portal** using `usePortal`, which creates and cleans up
  a container in `document.body`.
- **Focus management**:
  - Focus moves to the first focusable element on open.
  - `trapFocus` keeps Tab/Shift+Tab inside the dialog.
  - Focus returns to the trigger element on close.
- The `container` creation and the effects that need the mounted panel are
  coordinated through the render lifecycle (the portal mounts after
  `useEffect`, so focus/trap effects depend on `container`).
- Scroll lock via `useScrollLock`, which restores the previous `overflow`
  value on close (no hardcoded `''` assumption).
- `disabled` attributes are native, so focusable-element queries naturally
  skip them.

## Accessibility

- `role="dialog"` + `aria-modal="true"`.
- Title/description wired via `aria-labelledby` / `aria-describedby`.
- Backdrop is `aria-hidden` and is a sibling of the panel — clicks on the
  panel never register as backdrop clicks.

## Known limitations

- The panel itself isn't focusable by default; the close button (or the first
  focusable element) receives initial focus.
- Animations are entrance-only (no exit animation yet).
