# Badge

A compact label for statuses, counts, and categories.

## Usage

```tsx
import { Badge } from '../../components/Badge';

<Badge variant="success" dot>
  Live
</Badge>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Badge } from '@react-component-library';
```

## Props

| Prop        | Type                                                                       | Default     | Description                         |
| ----------- | -------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `children`  | `ReactNode`                                                                | —           | Badge content (text, icons, nodes). |
| `variant`   | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Semantic color.                     |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                     | `'md'`      | Badge size.                         |
| `dot`       | `boolean`                                                                  | `false`     | Shows a leading status dot.         |
| `pill`      | `boolean`                                                                  | `false`     | Fully rounded pill shape.           |
| `icon`      | `ReactNode`                                                                | —           | Icon rendered before the content.   |
| `className` | `string`                                                                   | —           | Additional CSS classes.             |

## Accessibility

- Rendered as a `<span>`; add a semantic wrapper (e.g. a live region or a
  heading hierarchy) where the badge conveys state.
- Icons and dots are `aria-hidden` so screen readers focus on the text.
