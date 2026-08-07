# Divider

A semantic horizontal or vertical separator with optional centered label.

## Usage

```tsx
import { Divider } from '../../components/Divider';

<>
  <p>Above</p>
  <Divider />
  <p>Below</p>
</>;
```

## Props

| Prop         | Type                             | Default    | Description                            |
| ------------ | -------------------------------- | ---------- | -------------------------------------- |
| `orientation`| `'horizontal' \| 'vertical'`     | `'horizontal'` | Direction of the separator.        |
| `variant`    | `'solid' \| 'dashed' \| 'dotted'`| `'solid'`  | Line style.                            |
| `children`   | `ReactNode`                      | —          | Optional centered label.               |
| `label`      | `string`                         | `'Divider'`| Accessible name for screen readers.    |
| `className`  | `string`                         | —          | Additional classes on the root.        |

## Accessibility

- Renders a native `<hr role="separator">` with `aria-orientation`.
- When a label is present, the decorative lines are hidden with
  `aria-hidden="true"`.

## Design decisions

- Vertical orientation is accomplished with the same `<hr>` element styled via
  `w-px` + `h-full` so the semantics stay uniform.
- The centered label uses `<span>` siblings with flex-1 lines, keeping the
  implementation lightweight and dependency-free.

## Known limitations

- When used with `orientation="vertical"` the parent must supply a height
  (`h-full` or an explicit height).