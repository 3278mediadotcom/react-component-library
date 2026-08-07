# Skeleton

Placeholder shapes that communicate loading state while content loads.

## Usage

```tsx
import { Skeleton } from '../../components/Skeleton';

<Skeleton variant="card" />;
```

## Props

| Prop         | Type                                     | Default    | Description                          |
| ------------ | ---------------------------------------- | ---------- | ------------------------------------ |
| `variant`    | `'text' \| 'avatar' \| 'button' \| 'card' \| 'image'` | `'text'` | Shape variant.           |
| `animation`  | `'pulse' \| 'wave'`                      | `'pulse'`  | Animation effect.                    |
| `width`      | `string \| number`                       | —          | Width (number = px).                 |
| `height`     | `string \| number`                       | —          | Height (number = px).                |
| `rounded`    | `boolean`                                | —          | Overrides shape to `rounded-lg`.     |
| `decorative` | `boolean`                                | `true`     | Hides the element from AT.           |
| `className`  | `string`                                 | —          | Additional classes on the root.      |

## Accessibility

- Skeletons are `aria-hidden` by default because loading shapes are not
  meaningful to screen readers.
- Announce loading state on the *container* instead:

```tsx
<div role="status" aria-busy="true" aria-label="Loading">
  <Skeleton variant="card" />
</div>
```

## Design decisions

- Variants map to explicit dimension + shape classes so compositions stay
  consistent (e.g. `avatar` is always `h-12 w-12 rounded-full`).
- `wave` uses a custom `@keyframes skeleton-wave` animation defined in
  `src/index.css` so it pairs with the Tailwind `animate-*` machinery.

## Known limitations

- Skeleton is a single element; building a full card skeleton requires
  composing several Skeletons (see the `ProfileCard` story).