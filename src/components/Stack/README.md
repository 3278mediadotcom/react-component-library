# Stack

A flexbox layout primitive for consistent vertical or horizontal composition.

## Usage

```tsx
import { Stack } from '../../components/Stack';

<Stack direction="column" spacing="md">
  <Card>Revenue</Card>
  <Card>Users</Card>
</Stack>;
```

## Props

| Prop        | Type                                                                | Default      | Description                     |
| ----------- | ------------------------------------------------------------------- | ------------ | ------------------------------- |
| `direction` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`            | `'column'`   | Flex direction.                 |
| `spacing`   | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`           | `'md'`       | Gap between children.           |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch'`                         | `'stretch'`  | Cross-axis alignment.           |
| `justify`   | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | —            | Main-axis alignment.            |
| `wrap`      | `boolean`                                                           | `false`      | Wraps children onto new lines.  |
| `className` | `string`                                                            | —            | Additional classes on the root. |

## Design decisions

- Pure utility-class mapping — no extra layout engine, so it composes with
  every other component in the library.
- Spacing uses the shared spacing scale so gaps stay consistent with the
  design tokens.