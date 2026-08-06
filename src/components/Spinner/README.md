# Spinner

An accessible indeterminate progress indicator.

## Usage

```tsx
import { Spinner } from '../../components/Spinner';

<Spinner size="md" variant="primary" />;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Spinner } from '@react-component-library';
```

## Props

| Prop         | Type                                            | Default     | Description                                    |
| ------------ | ----------------------------------------------- | ----------- | ---------------------------------------------- |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`          | `'md'`      | Visual size of the spinner.                    |
| `variant`    | `'primary' \| 'secondary' \| 'light' \| 'dark'` | `'primary'` | Color variant.                                 |
| `label`      | `string`                                        | `'Loading'` | Accessible label announced by screen readers.  |
| `decorative` | `boolean`                                       | `false`     | Hides the spinner from the accessibility tree. |
| `className`  | `string`                                        | —           | Additional CSS classes.                        |

## Accessibility

- Uses `role="status"` and `aria-live="polite"` so screen readers announce
  the loading state.
- Set `decorative` when embedding inside an element that already
  communicates progress (e.g. a loading button).
