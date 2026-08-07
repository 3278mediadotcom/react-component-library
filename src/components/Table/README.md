# Table

A semantic HTML table wrapper with density, striping, hover, sticky headers,
and responsive overflow.

## Usage

```tsx
import { Table, TableHeaderCell, TableCell } from '../../components/Table';

<Table caption="Team members" striped>
  <thead>
    <tr>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell align="end">Amount</TableHeaderCell>
    </tr>
  </thead>
  <tbody>
    <tr>
      <TableCell>Alice</TableCell>
      <TableCell align="end">$10</TableCell>
    </tr>
  </tbody>
</Table>;
```

## Props

| Prop           | Type                            | Default    | Description                       |
| -------------- | ------------------------------- | ---------- | --------------------------------- |
| `caption`      | `ReactNode`                     | —          | Accessible table caption.         |
| `striped`      | `boolean`                       | `false`    | Alternating row backgrounds.      |
| `hover`        | `boolean`                       | `false`    | Row hover highlight.              |
| `size`         | `'sm' \| 'md' \| 'lg'`          | `'md'`     | Cell density.                     |
| `fullWidth`    | `boolean`                       | `true`     | `w-full` on the table.            |
| `stickyHeader` | `boolean`                       | `false`    | Sticky header (needs `maxHeight`).|
| `maxHeight`    | `string \| number`              | —          | Vertical scroll limit.            |
| `responsive`   | `boolean`                       | `false`    | Horizontal overflow wrapper.      |
| `className`    | `string`                        | —          | Additional classes on `<table>`.  |

`TableHeaderCell` and `TableCell` accept `align` (`start|center|end`) and
`size` for per-cell density.

## Accessibility

- Uses real `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, and
  `<td>` elements — no `role` re-creation.
- `TableHeaderCell` renders `scope="col"` so every column header names its
  cells.
- A `caption` is rendered when provided, giving the table an accessible name.

## Design decisions

- `border-collapse: separate` + `border-spacing: 0` preserves 1px borders
  under the collapse quirks that break striped tables.
- Header styling is applied via static `[&_th]` / `[&_td]` utilities so the
  variant/`striped`/`hover` toggles stay on the table element rather than
  requiring a class per cell.

## Known limitations

- `stickyHeader` requires `maxHeight` (or an ancestor with a constrained
  height) to take effect.