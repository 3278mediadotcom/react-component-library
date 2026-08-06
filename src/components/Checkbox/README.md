# Checkbox

A native, accessible checkbox with label, helper text, error, and
indeterminate states.

## Usage

```tsx
import { Checkbox } from '../../components/Checkbox';

<Checkbox label="Accept terms" defaultChecked />;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Checkbox } from '@react-component-library';
```

## Props

| Prop            | Type      | Default | Description                                |
| --------------- | --------- | ------- | ------------------------------------------ |
| `label`         | `string`  | —       | Visible label associated with the control. |
| `helperText`    | `string`  | —       | Helper text via `aria-describedby`.        |
| `error`         | `string`  | —       | Error message; sets `aria-invalid`.        |
| `disabled`      | `boolean` | `false` | Disables the checkbox.                     |
| `indeterminate` | `boolean` | `false` | Shows the mixed (dash) state.              |
| `className`     | `string`  | —       | Additional CSS classes on the wrapper.     |

`checked`, `defaultChecked`, `onChange`, and all other native checkbox
attributes are forwarded.

## Design decisions

- Uses the **native** `<input type="checkbox">`; keyboard activation,
  focus, and screen reader semantics come for free.
- `indeterminate` is a DOM property, not an HTML attribute, so it is applied
  imperatively in an effect (the standard React pattern).

## Accessibility

- Keyboard: Tab focuses, Space toggles.
- Helper and error text are wired through `aria-describedby`.
- Errors set `aria-invalid` and use `role="alert"`.

## Known limitations

- There is no HTML attribute to _persist_ indeterminate; callers must re-render
  with `indeterminate` whenever the tri-state should apply.
