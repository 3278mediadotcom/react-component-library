# Button

The primary action control. Supports variants, sizes, icons, loading, and
full-width layouts.

## Usage

```tsx
import { Button } from '../../components/Button';

<Button variant="primary" size="md" onClick={handleSave}>
  Save
</Button>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Button } from '@react-component-library';
```

## Props

| Prop        | Type                                                                        | Default     | Description                                       |
| ----------- | --------------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success'` | `'primary'` | Visual variant.                                   |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                      | `'md'`      | Button size.                                      |
| `loading`   | `boolean`                                                                   | `false`     | Shows a spinner, blocks interaction, `aria-busy`. |
| `disabled`  | `boolean`                                                                   | `false`     | Disables the button.                              |
| `leftIcon`  | `ReactNode`                                                                 | —           | Icon before the label (decorative).               |
| `rightIcon` | `ReactNode`                                                                 | —           | Icon after the label (decorative).                |
| `fullWidth` | `boolean`                                                                   | `false`     | Stretches the button to container width.          |
| `type`      | `'button' \| 'submit' \| 'reset'`                                           | `'button'`  | Native button type.                               |
| `className` | `string`                                                                    | —           | Additional CSS classes.                           |

All other native `<button>` attributes are forwarded. `children` is required.

## Accessibility

- Focus ring via `focus-visible` styles.
- `aria-disabled` when `disabled`.
- `aria-busy` while `loading`, with an inline decorative `Spinner`.
- Enter and Space activate the button natively.
- Icon containers are `aria-hidden`.
