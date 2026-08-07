# Progress

Determinate and indeterminate progress indicators (linear and circular).

## Usage

```tsx
import { Progress } from '../../components/Progress';

<Progress value={65} label="Uploading…" showValue />;
```

## Props

| Prop           | Type                                        | Default    | Description                    |
| -------------- | ------------------------------------------- | ---------- | ------------------------------ |
| `variant`      | `'linear' \| 'circular'`                    | `'linear'` | Presentation.                  |
| `value`        | `number`                                    | —          | Value 0–100 (determinate).     |
| `indeterminate`| `boolean`                                   | `false`    | Animated unknown progress.     |
| `label`        | `string`                                    | —          | Accessible label.              |
| `showValue`    | `boolean`                                   | `false`    | Shows the % text (linear).     |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Accent color. |
| `size`         | `'sm' \| 'md' \| 'lg'`                      | `'md'`     | Circular size.                 |
| `thickness`    | `number`                                    | —          | Stroke/bar thickness.          |
| `className`    | `string`                                    | —          | Additional root classes.       |

## Accessibility

- Implements `role="progressbar"` with `aria-valuenow`, `aria-valuemin`,
  `aria-valuemax`, and `aria-valuetext` when determinate.
- Indeterminate progress omits the value attributes — screen readers treat a
  progressbar without `aria-valuenow` as "busy/indeterminate".
- The inline percentage text and svg are `aria-hidden` because the progressbar
  itself carries the semantics.

## Design decisions

- `value` clamps to 0–100.
- The indeterminate linear bar uses a sliding animation defined in
  `src/index.css` (`animate-progress-indeterminate`); the circular
  indeterminate state spins a partial arc.

## Keyboard shortcuts

None — progress is not interactive.

## Known limitations

- `thickness` applies to both variants but the bar reuses the track height
  when set on a linear bar.