# Alert

An inline message with a semantic tone and live-region semantics.

## Usage

```tsx
import { Alert } from '../../components/Alert';

<Alert variant="danger" title="Deletion failed" dismissible onDismiss={closeAlert}>
  The project could not be deleted.
</Alert>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Alert } from '@react-component-library';
```

## Props

| Prop          | Type                                                        | Default  | Description             |
| ------------- | ----------------------------------------------------------- | -------- | ----------------------- |
| `children`    | `ReactNode`                                                 | —(req)   | Alert content.          |
| `title`       | `string`                                                    | —        | Optional bold title.    |
| `icon`        | `ReactNode`                                                 | —        | Custom icon override.   |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'info'` | Semantic tone.          |
| `dismissible` | `boolean`                                                   | `false`  | Shows a dismiss button. |
| `onDismiss`   | `() => void`                                                | —        | Fired when dismissed.   |
| `className`   | `string`                                                    | —        | Additional CSS classes. |

## Design decisions

- **Role selection follows severity** (per ARIA Authoring Practices):
  - `danger` / `warning` → `role="alert"` (assertive, announced immediately)
  - `info` / `success` / `neutral` → `role="status"` (polite)
- Default icons are inline SVGs with `aria-hidden="true"`.
- The dismiss button uses `aria-label="Dismiss alert"` and is keyboard
  focusable.

## Accessibility

- Correct live-region `role` for the tone.
- Dismiss button is a native `<button>` (Tab focuses, Enter/Space activates).
- Focus ring on `focus-visible`.

## Known limitations

- This is an _inline_ alert; transient, auto-dismissing messages belong in
  the Toast system.
