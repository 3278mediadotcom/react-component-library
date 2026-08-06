# Breadcrumb

A navigation aid that shows the current page's position in the hierarchy.

## Usage

```tsx
import { Breadcrumb } from '../../components/Breadcrumb';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Components' },
  ]}
/>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Breadcrumb } from '@react-component-library';
```

## Props

| Prop        | Type               | Default        | Description                        |
| ----------- | ------------------ | -------------- | ---------------------------------- |
| `items`     | `BreadcrumbItem[]` | — (required)   | Items in order (first → current).  |
| `label`     | `string`           | `'Breadcrumb'` | Accessible nav landmark label.     |
| `className` | `string`           | —              | Additional CSS classes on the nav. |

`BreadcrumbItem`: `{ label: ReactNode; href?: string; current?: boolean }`.

- `href` renders an `<a>` for non-current items.
- `current: true` (or the last item) renders plain text with
  `aria-current="page"`.

## Design decisions

- Rendered as a `nav` landmark + ordered list (`ol`) so screen readers
  announce it as a navigation list.
- The final item is intentionally **not** a link — linking to the current page
  is a common accessibility/usability antipattern.
- Separators are decorative SVGs hidden from the accessibility tree.

## Keyboard shortcuts

- Tab focuses each link; Enter activates navigation.

## Accessibility

- `aria-label` identifies the breadcrumb landmark.
- `aria-current="page"` announces the current location.
- Focus ring on `focus-visible`.

## Known limitations

- No collapsing/truncation for extremely deep hierarchies (consider
  `aria-label` + custom items for edge cases).
