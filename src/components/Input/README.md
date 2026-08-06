# Input

A fully accessible text field with labels, validation, icons, and
prefix/suffix content.

## Usage

```tsx
import { Input } from '../../components/Input';

<Input label="Email" type="email" error={hasError ? 'Invalid email' : undefined} />;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Input } from '@react-component-library';
```

## Props

| Prop          | Type                                                               | Default  | Description                               |
| ------------- | ------------------------------------------------------------------ | -------- | ----------------------------------------- |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'url'` | `'text'` | Native input type.                        |
| `label`       | `string`                                                           | —        | Label associated via `htmlFor`.           |
| `placeholder` | `string`                                                           | —        | Placeholder text.                         |
| `helperText`  | `string`                                                           | —        | Helper text wired via `aria-describedby`. |
| `error`       | `string`                                                           | —        | Error message; sets `aria-invalid`.       |
| `disabled`    | `boolean`                                                          | `false`  | Disables the input.                       |
| `required`    | `boolean`                                                          | `false`  | Marks the field required (native).        |
| `prefix`      | `ReactNode`                                                        | —        | Content before the input (decorative).    |
| `suffix`      | `ReactNode`                                                        | —        | Content after the input (decorative).     |
| `leftIcon`    | `ReactNode`                                                        | —        | Left icon (decorative).                   |
| `rightIcon`   | `ReactNode`                                                        | —        | Right icon (decorative).                  |
| `className`   | `string`                                                           | —        | Additional CSS classes.                   |

All other native `<input>` attributes are forwarded (e.g. `value`, `onChange`,
`id`, `defaultValue`, `min`, `max`).

## Accessibility

- Label is associated via `htmlFor` + `id` (a stable id is generated with
  `useId` when none is provided).
- Errors set `aria-invalid` and are wired through `aria-describedby` with a
  `role="alert"` message.
- Helper text is also wired through `aria-describedby`.
- Icons and prefix/suffix are `aria-hidden`.
