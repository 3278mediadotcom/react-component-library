# Toast

A toast notification system: `ToastProvider` + `useToast()` with auto-dismiss,
pause-on-hover, stacking, and max-visible capping.

## Usage

```tsx
import { ToastProvider, useToast } from '../../components/Toast';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

function YourApp() {
  const toast = useToast();
  return <button onClick={() => toast.success({ title: 'Saved', content: 'Done!' })}>Save</button>;
}
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { ToastProvider, useToast } from '@react-component-library';
```

## Provider props

| Prop         | Type                                                           | Default          | Description               |
| ------------ | -------------------------------------------------------------- | ---------------- | ------------------------- |
| `children`   | `ReactNode`                                                    | — (req)          | Application tree.         |
| `duration`   | `number`                                                       | `5000`           | Default auto-dismiss ms.  |
| `maxVisible` | `number`                                                       | `5`              | Max toasts shown at once. |
| `placement`  | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Stack position.           |

## `useToast()` API

| Method    | Signature                           | Description                        |
| --------- | ----------------------------------- | ---------------------------------- |
| `success` | `(options: ToastOptions) => string` | Push a success toast (returns id). |
| `error`   | `(options: ToastOptions) => string` | Push an error toast.               |
| `info`    | `(options: ToastOptions) => string` | Push an info toast.                |
| `warning` | `(options: ToastOptions) => string` | Push a warning toast.              |
| `show`    | `(variant, options) => string`      | Push with an explicit variant.     |
| `dismiss` | `(id: string) => void`              | Trigger exit animation + remove.   |
| `remove`  | `(id: string) => void`              | Remove immediately.                |

`ToastOptions`: `{ content: ReactNode; title?: string; duration?: number }` —
`duration: 0` creates a persistent toast (manual dismiss only).

## Design decisions

- **Auto-dismiss** via per-toast timers; `duration: 0` persists.
- **Pause on hover**: entering the stack clears timers; leaving reschedules
  from scratch (side effects live outside state updaters so StrictMode double
  invocation can't duplicate timers).
- **Exit animation**: `dismiss` flips `visible` (fade via `opacity-0` +
  `transition-opacity`) then removes after `EXIT_DURATION`.
- The viewport is a `role="status"` + `aria-live="polite"` live region.
- Max-visible slicing drops the oldest toasts.

## Accessibility

- The live region announces new toasts to screen readers.
- Dismiss buttons carry `aria-label="Dismiss notification"`.

## Known limitations

- Promise-based toasts (`toast.xxx().then()`) are not built in yet.
- Progress bars are decorative (no pause/resume animation state tracking).
