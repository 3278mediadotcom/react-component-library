# Accordion

A vertically stacking set of expandable panels with full keyboard support.

## Usage

```tsx
import { Accordion } from '../../components/Accordion';

<Accordion
  items={[
    { value: 'billing', header: 'How does billing work?', content: <p>…</p> },
    { value: 'refunds', header: 'Can I get a refund?', content: <p>…</p> },
  ]}
/>;
```

## Props

| Prop            | Type                          | Default    | Description                          |
| --------------- | ----------------------------- | ---------- | ------------------------------------ |
| `items`         | `AccordionItem[]`             | — (req)    | Item descriptors.                    |
| `value`         | `string[]`                    | —          | Controlled open values.              |
| `defaultValue`  | `string[]`                    | —          | Initial open values (uncontrolled).  |
| `onValueChange` | `(value: string[]) => void`   | —          | Fires when the open set changes.     |
| `type`          | `'single' \| 'multiple'`      | `'single'` | Whether multiple panels stay open.   |
| `collapsible`   | `boolean`                     | `true`     | Allows closing the open item (single).|
| `className`     | `string`                      | —          | Additional root classes.             |

## Keyboard shortcuts

| Key             | Action                                        |
| --------------- | --------------------------------------------- |
| `Tab`           | Focuses the open (roving) trigger.            |
| `ArrowDown`     | Moves focus to the next trigger.              |
| `ArrowUp`       | Moves focus to the previous trigger.          |
| `Home`          | Moves focus to the first trigger.             |
| `End`           | Moves focus to the last trigger.              |
| `Enter` / Space | Toggles the focused item (native button).     |

## Accessibility

- Triggers expose `aria-expanded` and `aria-controls` wiring them to their
  panels.
- Panels expose `role="region"` with `aria-labelledby` pointing at their
  trigger, and closed panels are `aria-hidden`.
- Roving tabindex keeps only the active trigger in the tab order.
- Disabled triggers are both `disabled` and `aria-disabled`, and are skipped
  during arrow-key navigation.

## Design decisions

- Single mode opens the first enabled item by default; multiple mode starts
  fully collapsed.
- Collapse/expand is animated with a CSS `grid-template-rows` transition
  (0fr → 1fr), avoiding height measurement.
- `useControllableState` powers controlled/uncontrolled usage consistently
  with the rest of the library.

## Known limitations

- The panel animation needs `overflow-hidden` inside the grid wrapper, which
  clips any focus ring that extends past the panel content.