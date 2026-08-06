# Card

A flexible content container with optional header, footer, and hover states.

## Usage

```tsx
import { Card } from '../../components/Card';

<Card title="Profile" subtitle="Personal details">
  Body content
</Card>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Card } from '@react-component-library';
```

## Props

| Prop        | Type                                    | Default     | Description                             |
| ----------- | --------------------------------------- | ----------- | --------------------------------------- |
| `children`  | `ReactNode`                             | —           | Card body content.                      |
| `variant`   | `'default' \| 'outlined' \| 'elevated'` | `'default'` | Surface variant.                        |
| `title`     | `ReactNode`                             | —           | Header title.                           |
| `subtitle`  | `ReactNode`                             | —           | Header subtitle.                        |
| `footer`    | `ReactNode`                             | —           | Footer content.                         |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg'`        | `'md'`      | Padding for header/body/footer regions. |
| `hoverable` | `boolean`                               | `false`     | Hover elevation feedback.               |
| `className` | `string`                                | —           | Additional CSS classes.                 |

## Accessibility

- Rendered as an `<article>` with semantic `<header>`/`<footer>` regions.
- Titles use an `<h3>` heading level.
- On interactive cards, wrap the Card in an `<a>` or add a keyboard-focusable
  action; `hoverable` adds a `focus-visible` ring for that case.
