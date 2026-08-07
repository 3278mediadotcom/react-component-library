# ADR 001 — Controlled / Uncontrolled State Pattern

## Status

Accepted.

## Decision

Components that manage internal state (Modal, Drawer, Tabs, Accordion, Select,
Pagination, DataTable, Switch, Checkbox, RadioGroup, etc.) expose **both
controlled and uncontrolled modes**:

| Uncontrolled (default)        | Controlled                        |
| ----------------------------- | --------------------------------- |
| `defaultOpen` / `defaultPage` | `open` / `page`                   |
| No `onChange` required        | `onClose` / `onPageChange` fired  |
| State owned by the component  | State owned by the host app       |

The shared `useControllableState` hook (`src/hooks/useControllableState.ts`)
implements the pattern: when a value prop is provided the component is
controlled; otherwise it falls back to internal state and calls the change
callback.

## Reasoning

- **Application integration**: real apps need to own state (e.g. open a modal
  from a form, persist a DataTable page).
- **Internal demos/stories**: uncontrolled mode lets Storybook and quick usage
  render a component with zero wiring.
- **Consistent API across 29 components**: one mental model for consumers.

## Tradeoffs

- More API surface per component (two prop sets per bit of state).
- Requires careful documentation to avoid confusion between `open` and
  `defaultOpen`.
