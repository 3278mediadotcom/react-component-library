# ADR 002 — Overlay System (Modal, Drawer, Popover, Tooltip, Toast)

## Status

Accepted.

## Decision

All overlay-style components share a common infrastructure:

- **Portal rendering** (`usePortal` + `src/utils/portal.ts`) — overlays render
  into `document.body` to escape `overflow`/`transform` clipping contexts.
- **Scroll lock** (`useScrollLock`) — body scroll is disabled while an overlay
  is open.
- **Focus trap** — Modal and Drawer keep Tab/Shift+Tab cycling inside the
  dialog; focus returns to the trigger on close.
- **Escape-to-close** (`useEscapeKey`) — configurable per component.
- **Click-outside** (`useClickOutside`) — for Popover/Drawer backdrops.
- **Entrance animations** — theme tokens in `src/index.css`
  (`--animate-modal-in`, `--animate-drawer-in-*`, `--animate-toast-in`,
  `--animate-overlay-in`, `--animate-pop`) applied via `animate-*` utilities.

## Reasoning

- Overlays are the riskiest components for accessibility; sharing a hardened
  core means the patterns are implemented once and reviewed once.
- Portals + scroll lock + focus trap are prerequisites for WCAG AA dialog
  compliance.

## Tradeoffs

- Portal rendering means the consumer's CSS cascade (e.g. Tailwind layers in
  an app) does not automatically apply inside overlays — the library ships its
  own compiled CSS so this is handled.
- Focus trapping is non-trivial; the shared implementation must be validated
  with browser tests (Storybook vitest + Playwright).
