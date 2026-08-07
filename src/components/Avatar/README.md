# Avatar

Displays a user image with automatic fallback to initials, then an icon.

## Usage

```tsx
import { Avatar } from '../../components/Avatar';

<Avatar src="/ada.png" initials="AL" label="Ada Lovelace" />;
```

## Props

| Prop       | Type                                               | Default    | Description                             |
| ---------- | -------------------------------------------------- | ---------- | --------------------------------------- |
| `src`      | `string`                                           | —          | Image URL.                              |
| `alt`      | `string`                                           | —          | Alt text for the image.                 |
| `initials` | `string`                                           | —          | Initials fallback.                      |
| `icon`     | `ReactNode`                                        | —          | Icon fallback.                          |
| `shape`    | `'circle' \| 'rounded' \| 'square'`                | `'circle'` | Visual shape.                           |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`             | `'md'`     | Size.                                   |
| `status`   | `'online' \| 'offline' \| 'away' \| 'busy'`        | —          | Optional status dot.                    |
| `label`    | `string`                                           | —          | Accessible name (overrides `alt`/`initials`). |
| `className`| `string`                                           | —          | Additional classes on the root.         |

## Fallback chain

```
Image → Initials → Icon → empty
```

When the image fails to load, the component swaps to initials (or icon)
automatically.

## Accessibility

- The root renders `role="img"` with an accessible name derived from
  `label`, then `alt`, then `initials`, defaulting to `"Avatar"`.
- The image inside is `alt=""` so its name is not announced twice.
- The status dot is `aria-hidden`.

## Design decisions

- A built-in `ring-2` creates the separation gap when avatars are stacked in
  an `AvatarGroup`.