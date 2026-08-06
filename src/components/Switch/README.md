# Switch

An accessible on/off toggle with optional labels, icons, and a loading state.

## Usage

```tsx
import { Switch } from '../../components/Switch';

<Switch label="Dark mode" defaultChecked />;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Switch } from '@react-component-library';
```

## Props

| Prop              | Type                         | Default | Description                            |
| ----------------- | ---------------------------- | ------- | -------------------------------------- |
| `checked`         | `boolean`                    | —       | Controlled on/off state.               |
| `defaultChecked`  | `boolean`                    | `false` | Initial state for uncontrolled usage.  |
| `onCheckedChange` | `(checked: boolean) => void` | —       | Fired on toggle.                       |
| `label`           | `string`                     | —       | Visible label (accessible name).       |
| `disabled`        | `boolean`                    | `false` | Disables the switch.                   |
| `loading`         | `boolean`                    | `false` | Shows a spinner and blocks toggling.   |
| `checkedIcon`     | `ReactNode`                  | —       | Icon inside the thumb when on.         |
| `uncheckedIcon`   | `ReactNode`                  | —       | Icon inside the thumb when off.        |
| `className`       | `string`                     | —       | Additional CSS classes on the wrapper. |

## Design decisions

- Rendered as a `<button role="switch">` so Enter/Space toggle it natively and
  screen readers announce `aria-checked` correctly.
- Controlled/uncontrolled via the shared `useControllableState` hook.
- The thumb uses `translate-x` transforms so the toggle animates smoothly.

## Accessibility

- `role="switch"` + `aria-checked`.
- Visible label is wired via `aria-labelledby`.
- Keyboard: Tab focuses, Enter/Space toggle.
- Disabled and loading states are communicated to assistive tech.

## Known limitations

- With icons, the thumb has very limited space — keep icons minimal (10px).
