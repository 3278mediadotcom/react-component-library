# Select

An accessible single-select combobox with full keyboard support, type-ahead
search, controlled/uncontrolled usage, and an optional clear button.

## Usage

```tsx
import { Select } from '../../components/Select';

<Select
  label="Favorite fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  defaultValue="apple"
  onValueChange={setFruit}
  clearable
/>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Select } from '@react-component-library';
```

## Props

| Prop            | Type                      | Default              | Description                       |
| --------------- | ------------------------- | -------------------- | --------------------------------- |
| `options`       | `SelectOption[]`          | — (required)         | Options for the listbox.          |
| `value`         | `string`                  | —                    | Controlled selected value.        |
| `defaultValue`  | `string`                  | `''`                 | Initial value (uncontrolled).     |
| `onValueChange` | `(value: string) => void` | —                    | Fired when the selection changes. |
| `placeholder`   | `string`                  | `'Select an option'` | Shown when nothing is selected.   |
| `disabled`      | `boolean`                 | `false`              | Disables the whole select.        |
| `label`         | `string`                  | —                    | Visible label (accessible name).  |
| `helperText`    | `string`                  | —                    | Help text via `aria-describedby`. |
| `error`         | `string`                  | —                    | Error message + `aria-invalid`.   |
| `required`      | `boolean`                 | `false`              | Visual required indicator.        |
| `clearable`     | `boolean`                 | `false`              | Shows a clear button.             |
| `clearLabel`    | `string`                  | `'Clear selection'`  | Accessible clear-button label.    |
| `className`     | `string`                  | —                    | Additional CSS classes.           |

`SelectOption`: `{ value: string; label: string; disabled?: boolean; hint?: string }`.

## Keyboard shortcuts

| Key                     | Action                                              |
| ----------------------- | --------------------------------------------------- |
| `ArrowDown` / `ArrowUp` | Open + move the active option.                      |
| `Enter` / `Space`       | Open; select the active option when open.           |
| `Home` / `End`          | Move to the first/last option.                      |
| `Escape`                | Close the listbox without selecting.                |
| Printable characters    | Type-ahead: jump to the option starting with input. |

## Design decisions

- Implements the WAI-ARIA **combobox** pattern with `aria-activedescendant`
  so screen readers track the active option.
- Disabled options are filtered entirely from keyboard navigation.
- `aria-labelledby` (not `htmlFor`) names the combobox because a `div` with
  `role="combobox"` is not a native labelable element.
- Listbox closes on outside click via the shared `useClickOutside` hook.
- Type-ahead buffer resets after 700ms of inactivity.

## Accessibility

- `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-haspopup`.
- Option list uses `role="listbox"` / `role="option"` with `aria-selected`.
- `aria-invalid` and `aria-describedby` for error/helper text.

## Known limitations

- Single selection only (no multi-select or tag input yet).
- No async search/loading options — wire `options` from your data layer.
