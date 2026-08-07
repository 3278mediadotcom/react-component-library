# AvatarGroup

Stacks avatars with overlap and collapses overflow into a `+N` chip.

## Usage

```tsx
import { AvatarGroup } from '../../components/AvatarGroup';

<AvatarGroup
  items={[
    { initials: 'AL', label: 'Ada Lovelace' },
    { initials: 'RF', label: 'Rosalind Franklin' },
  ]}
  max={3}
/>;
```

## Props

| Prop          | Type                                    | Default    | Description                          |
| ------------- | --------------------------------------- | ---------- | ------------------------------------ |
| `items`       | `AvatarGroupItem[]`                     | — (req)    | Avatar descriptors.                  |
| `max`         | `number`                                | `5`        | Max avatars before collapsing.       |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`  | `'md'`     | Size for every avatar.               |
| `shape`       | `'circle' \| 'rounded' \| 'square'`     | `'circle'` | Shape for every avatar.              |
| `spacing`     | `'sm' \| 'md' \| 'lg'`                  | `'md'`     | Overlap between avatars.             |
| `showTooltip` | `boolean`                               | `false`    | Wraps avatars in a Tooltip.          |
| `label`       | `string`                                | `'Team'`   | Accessible label for the group.      |
| `className`   | `string`                                | —          | Additional classes on the root.      |

Each `AvatarGroupItem` accepts all `AvatarProps` except `size`, `shape`, and
`className` (which are controlled by the group), plus an optional `name` used
as Tooltip content.

## Accessibility

- The root renders `role="group"` with the `label` prop as its accessible
  name.
- Every avatar keeps its own accessible name.
- The overflow chip is `aria-hidden` so the count is not announced twice
  (the group label should describe membership instead).

## Design decisions

- Overlap is implemented with negative margins scaled by the `spacing` token
  rather than z-index tricks, keeping DOM order meaningful.
- The built-in `ring-2` on each `Avatar` creates the separation gap between
  stacked faces.