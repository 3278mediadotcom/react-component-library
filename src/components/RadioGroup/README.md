# RadioGroup

An accessible radio group with keyboard navigation, controlled/uncontrolled
usage, validation, and orientation options.

## Usage

```tsx
import { RadioGroup } from '../../components/RadioGroup';

<RadioGroup
  name="plan"
  label="Billing plan"
  options={[
    { value: 'starter', label: 'Starter' },
    { value: 'pro', label: 'Pro' },
  ]}
  defaultValue="starter"
  onValueChange={(value) => console.log(value)}
/>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { RadioGroup } from '@react-component-library';
```

## Props

| Prop            | Type                         | Default      | Description                            |
| --------------- | ---------------------------- | ------------ | -------------------------------------- |
| `options`       | `RadioOption[]`              | —(required)  | Options to render.                     |
| `name`          | `string`                     | —(required)  | Native input `name` (form submission). |
| `value`         | `string`                     | —            | Controlled selected value.             |
| `defaultValue`  | `string`                     | —            | Initial value (uncontrolled).          |
| `onValueChange` | `(value: string) => void`    | —            | Fired on selection change.             |
| `label`         | `ReactNode`                  | —            | Group label (legend equivalent).       |
| `helperText`    | `string`                     | —            | Help text via `aria-describedby`.      |
| `error`         | `string`                     | —            | Error message + `aria-invalid`.        |
| `disabled`      | `boolean`                    | `false`      | Disables the whole group.              |
| `required`      | `boolean`                    | `false`      | Marks the selected input required.     |
| `orientation`   | `'horizontal' \| 'vertical'` | `'vertical'` | Layout arrangement.                    |
| `className`     | `string`                     | —            | Additional CSS classes on the wrapper. |

`RadioOption`: `{ value: string; label?: ReactNode; helperText?: string; disabled?: boolean }` —
passed via the `options` prop.

## Keyboard shortcuts

| Key                        | Action                                           |
| -------------------------- | ------------------------------------------------ |
| `Tab`                      | Moves focus into the group (roving tabindex).    |
| `ArrowDown` / `ArrowRight` | Selects and focuses the next enabled option.     |
| `ArrowUp` / `ArrowLeft`    | Selects and focuses the previous enabled option. |
| `Home`                     | Selects and focuses the first enabled option.    |
| `End`                      | Selects and focuses the last enabled option.     |

## Design decisions

- Follows the WAI-ARIA **radio group** pattern: `role="radiogroup"` +
  `role="radio"` (via native inputs) with roving tabindex.
- Arrow keys select _and_ focus, matching native radio behavior.
- Disabled options are skipped during keyboard navigation.
- Rendered from a plain `options` array (no context provider needed), which
  keeps the API declarative and forms-friendly (native `name` support).

## Accessibility

- Radiogroup label via `aria-labelledby`.
- Helper/error text via `aria-describedby`.
- Roving tabindex ensures the group is a single Tab stop.
- Focus ring on `focus-visible`.

## Known limitations

- Options are data-driven (`RadioOption[]`); free-form JSX children are not
  supported by design to keep selection + keyboard logic simple and correct.
