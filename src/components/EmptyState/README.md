# EmptyState

A neutral placeholder for empty data — no results, no records, no rows.

## Usage

```tsx
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';

<EmptyState
  title="No projects found"
  description="Try adjusting your filters or create a new project."
  action={<Button size="sm">New project</Button>}
/>;
```

## Props

| Prop            | Type                    | Default      | Description                    |
| --------------- | ----------------------- | ------------ | ------------------------------ |
| `illustration`  | `ReactNode`             | —            | Icon or illustration.          |
| `title`         | `ReactNode`             | — (req)      | Title text.                    |
| `description`   | `ReactNode`             | —            | Supporting text.               |
| `action`        | `ReactNode`             | —            | Primary action.                |
| `secondaryAction`| `ReactNode`            | —            | Secondary action.              |
| `layout`        | `'vertical' \| 'horizontal'` | `'vertical'` | Orientation.             |
| `className`     | `string`                | —            | Additional root classes.       |

## Accessibility

- The title renders as an `<h3>` so the empty state participates in the page's
  heading hierarchy.
- Illustrations are wrapped in `aria-hidden="true"` since they are decorative.
- Actions are plain nodes — pass any interactive element (e.g. `Button`).

## Design decisions

- A neutral circle container gives any icon or illustration a consistent
  visual anchor.
- `layout="horizontal"` lets EmptyState sit inline in a table row or split
  panel without losing the title/description hierarchy.

## Known limitations

- This is a presentation component; it does not manage the empty/loading
  transitions itself.