import type { HTMLAttributes } from 'react';
import type { AvatarProps, AvatarShape, AvatarSize } from '../Avatar';

/** A single avatar descriptor rendered by the group. */
export interface AvatarGroupItem extends Omit<AvatarProps, 'size' | 'shape' | 'className'> {
  /** Name used as the Tooltip content when `showTooltip` is enabled. */
  name?: string;
}

/** Overlap spacing between stacked avatars. */
export type AvatarGroupSpacing = 'sm' | 'md' | 'lg';

/**
 * Props for the AvatarGroup component.
 */
export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Avatar descriptors to render. */
  items: AvatarGroupItem[];
  /** Maximum avatars shown before collapsing into an overflow chip.
   *  Defaults to `5`. */
  max?: number;
  /** Size applied to every avatar. Defaults to `'md'`. */
  size?: AvatarSize;
  /** Shape applied to every avatar. Defaults to `'circle'`. */
  shape?: AvatarShape;
  /** Overlap spacing between avatars. Defaults to `'md'`. */
  spacing?: AvatarGroupSpacing;
  /** Wraps each avatar in a Tooltip showing its `name`. */
  showTooltip?: boolean;
  /** Accessible label for the group. Defaults to `'Team'`. */
  label?: string;
  /** Additional CSS classes on the root. */
  className?: string;
}
