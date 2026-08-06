# Tabs

An accessible tab interface with horizontal/vertical layouts, disabled tabs,
icons, and controlled/uncontrolled usage.

## Usage

```tsx
import { Tabs } from '../../components/Tabs';

<Tabs
  label="Account"
  items={[
    { value: 'overview', label: 'Overview', content: <Overview /> },
    { value: 'activity', label: 'Activity', content: <Activity /> },
  ]}
  defaultValue="overview"
/>;
```

Once package exports land (Phase 5), the import becomes:

```tsx
import { Tabs } from '@react-component-library';
```

## Props

| Prop            | Type                         | Default        | Description                |
| --------------- | ---------------------------- | -------------- | -------------------------- |
| `items`         | `TabItem[]`                  | — (required)   | Tab descriptors.           |
| `value`         | `string`                     | —              | Controlled active tab.     |
| `defaultValue`  | `string`                     | first enabled  | Initial active tab.        |
| `onValueChange` | `(value: string) => void`    | —              | Fired on selection change. |
| `orientation`   | `'horizontal' \| 'vertical'` | `'horizontal'` | Tablist layout.            |
| `label`         | `string`                     | — (required)   | Accessible tablist label.  |
| `className`     | `string`                     | —              | Additional CSS classes.    |

`TabItem`: `{ value: string; label: ReactNode; icon?: ReactNode; disabled?: boolean; content?: ReactNode }`.

## Keyboard shortcuts

| Key                        | Action                                                    |
| -------------------------- | --------------------------------------------------------- |
| `Tab`                      | Focuses the active tab (roving tabindex).                 |
| `ArrowRight` / `ArrowLeft` | Activates and focuses the next/previous tab (horizontal). |
| `ArrowDown` / `ArrowUp`    | Same for vertical orientation.                            |
| `Home`                     | Focuses the first tab (without activating).               |
| `End`                      | Focuses the last tab (without activating).                |
| `Enter` / `Space`          | Activates the focused tab.                                |

## Design decisions

- Follows the WAI-ARIA tabs pattern with **automatic activation** (arrow keys
  select immediately), which is the recommended default.
- Home/End move focus but do **not** activate — users confirm with Enter/Space.
- Roving tabindex keeps only the active tab in the tab order.
- Panels are wired to tabs via `aria-controls` / `aria-labelledby`.

## Accessibility

- `role="tablist"` / `role="tab"` / `role="tabpanel"`.
- `aria-selected` on tabs; `hidden` on inactive panels.
- Disabled tabs are skipped by keyboard navigation and marked disabled.

## Known limitations

- Content is declarative (`content` per item); expensive panels should be
  lazy-rendered by callers to avoid mounting all panels at once.
