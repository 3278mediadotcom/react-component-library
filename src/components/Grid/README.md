# Grid

A CSS grid layout primitive with responsive columns and auto-fit/fill support.

## Usage

```tsx
import { Grid } from '../../components/Grid';

<Grid columns={3} gap="md">
  <Card>Item</Card>
  <Card>Item</Card>
  <Card>Item</Card>
</Grid>;
```

## Props

| Prop             | Type                              | Default    | Description                             |
| ---------------- | --------------------------------- | ---------- | --------------------------------------- |
| `columns`        | `number \| string`                | `1`        | Column count or raw grid-template value.|
| `gap`            | Spacing token                     | `'md'`     | Gap between tracks.                     |
| `breakpoints`    | `{ sm, md, lg, xl, '2xl' }`       | —          | Per-breakpoint column overrides.        |
| `autoFit`        | `boolean`                         | `false`    | Auto-fit tracks to fill the container.  |
| `autoFill`       | `boolean`                         | `false`    | Auto-fill with empty trailing tracks.   |
| `minColumnWidth` | `string`                          | `'250px'`  | Min track width for auto-fit/fill.      |
| `className`      | `string`                          | —          | Additional classes on the root.         |

## Responsive columns

```tsx
<Grid columns={1} breakpoints={{ sm: 2, lg: 4 }} gap="md">
  {/* 1 col on mobile, 2 on ≥sm, 4 on ≥lg */}
</Grid>;
```

## Design decisions

- Tailwind only generates `grid-cols-1`…`grid-cols-12` and cannot see dynamic
  class names. This component wires column counts through CSS custom
  properties referenced by *static* arbitrary-value classes, so any column
  count works without Tailwind scanner changes.
- Breakpoints use the same `sm`/`md`/`lg`/`xl`/`2xl` scale as the rest of the
  design system.
- Counts above 12 or raw string templates fall back to inline
  `grid-template-columns`, keeping the class surface small.

## Known limitations

- `autoFit` and `autoFill` are mutually exclusive; if both are set, `autoFit`
  wins.