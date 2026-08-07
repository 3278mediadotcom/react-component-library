# Accessibility

The library is built with **WCAG 2.1 AA** as the baseline. Every component ships
with keyboard support, focus management, and ARIA semantics — tested in the
component test suites and Storybook's a11y addon.

## Philosophy

1. **Semantics first** — use native elements (`<button>`, `<input>`, `<table>`,
   `<dialog>` semantics) wherever possible, and enhance only when ARIA patterns
   require it.
2. **Focus is visible** — every focusable element has a visible focus indicator
   (`focus-visible:outline-*`).
3. **Keyboard parity** — every mouse interaction has a keyboard equivalent.
4. **Screen-reader friendly** — labels, descriptions, and live regions are wired
   through `aria-*` attributes, never implicit.

## Keyboard interactions

| Component | Keys | Behavior |
| --------- | ---- | -------- |
| Modal / Drawer | `Esc` | Closes the dialog |
| Modal / Drawer | `Tab` / `Shift+Tab` | Moves focus within the focus trap |
| Tabs | `←` / `→` | Activates the previous/next tab |
| Tabs | `Home` / `End` | Activates the first/last tab |
| RadioGroup | `←` / `→` (or `↑` / `↓`) | Moves selection between options |
| Select | `↑` / `↓` | Navigates listbox options |
| Select | `Enter` | Confirms selection |
| Select | `Esc` | Closes the listbox |
| Accordion | `Enter` / `Space` | Toggles the section |
| Toast | `Esc` (with focus) | Dismisses the toast |
| DataTable | `Tab` | Moves between sort controls and interactive cells |

## ARIA patterns

### Modal / Drawer

- `role="dialog"` (`role="alertdialog"` for alerts), `aria-modal="true"`
- `aria-labelledby` wired to the title
- `aria-describedby` wired to the description when provided
- Initial focus moves to the dialog; focus is trapped while open
- Body scroll is locked with `overflow: hidden`
- Escape closes and returns focus to the trigger

### Tabs

- `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-controls`
- Roving `tabindex` — only the active tab is in the tab order
- `aria-selected` reflects the active tab
- `aria-orientation` set for vertical tabs

### Select

- Combobox pattern: `role="combobox"` on the trigger, `role="listbox"` /
  `role="option"` on the menu
- `aria-expanded` and `aria-controls` manage state
- `aria-activedescendant` announces the highlighted option to screen readers

### DataTable

- Semantic `<table>` with `<caption>` or a labelled region
- Sort buttons exposed as `aria-sort` on the header cells
- Filter inputs labelled via `aria-label` or associated `<label>`
- A visually-hidden live region announces result counts / state changes

### Toast

- `role="status"` / `role="alert"` live regions for dynamic announcements
- `aria-live="polite"` for informational toasts, `aria-live="assertive"` for
  errors
- Auto-dismiss respects `prefers-reduced-motion`

### Tooltip / Popover

- `aria-describedby` links the trigger to the tooltip content
- `aria-haspopup` + `aria-expanded` on Popover triggers
- Closes on `Esc`; focus remains on the trigger

## Focus management

- Overlays (Modal, Drawer, Popover) move focus into the container on open and
  return it to the trigger on close.
- The Modal and Drawer components keep Tab/Shift+Tab cycling inside the dialog
  while it is open.
- Tabs and RadioGroup use the **roving tabindex** pattern so assistive tech does
  not have to tab through every option.

## Motion and contrast

- All animations are short (120–300 ms) and can be disabled via
  `prefers-reduced-motion`.
- Focus indicators and text colors meet 4.5:1 contrast against default
  backgrounds.
- Dark mode variants are tuned for contrast in dark environments.

## Testing

- Component test suites assert `aria-*` attributes, focus behavior, and Escape
  handling (see `.test.tsx` files).
- Storybook's **a11y addon** runs automated checks on every story.
- Unit tests run with `npm run test`; a11y checks run through the Storybook
  test runner (`npm run test:stories`).