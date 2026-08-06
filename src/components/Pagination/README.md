# Pagination

Page navigation that automatically collapses large page counts with ellipses.

## Usage

```tsx
import { Pagination } from '../../components/Pagination';

<Pagination pageCount={15} defaultPage={8} onPageChange={setPage} />;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Pagination } from '@react-component-library';
```

## Props

| Prop            | Type                     | Default        | Description                         |
| --------------- | ------------------------ | -------------- | ----------------------------------- |
| `pageCount`     | `number`                 | — (required)   | Total number of pages.              |
| `page`          | `number`                 | —              | Controlled current page (1-based).  |
| `defaultPage`   | `number`                 | `1`            | Initial page (uncontrolled).        |
| `onPageChange`  | `(page: number) => void` | —              | Fired when the active page changes. |
| `siblingCount`  | `number`                 | `1`            | Visible pages around the current.   |
| `boundaryCount` | `number`                 | `1`            | Visible pages at both ends.         |
| `disabled`      | `boolean`                | `false`        | Disables all interactions.          |
| `label`         | `string`                 | `'Pagination'` | Accessible nav landmark label.      |
| `className`     | `string`                 | —              | Additional CSS classes.             |

## Ellipsis collapsing

Example: `pageCount=15, defaultPage=8` renders

```text
‹ 1 … 7 8 9 … 15 › « »
```

- Single-page gaps are filled with the number.
- Only gaps of 2+ pages collapse into an ellipsis.

## Design decisions

- Rendered as a `nav` landmark so screen readers expose it as a navigation.
- The current page uses `aria-current="page"`.
- First/Last quick-jump buttons appear only when `pageCount > 3`.
- Controlled/uncontrolled via `useControllableState`; out-of-range pages are
  clamped.

## Accessibility

- All controls are native `<button>`s (focusable, keyboard activatable).
- `aria-label`s identify each control ("Previous page", "Go to page 5", ...).
- Disabled controls stay in the tab order only when individually reachable;
  the disabled attribute removes them from interaction.

## Known limitations

- No URL-sync (`?page=2`) integration — wire `onPageChange` to your router.
