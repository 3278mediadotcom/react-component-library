import type { HTMLAttributes, ReactNode } from 'react';

/** Visual shape of the avatar. */
export type AvatarShape = 'circle' | 'rounded' | 'square';

/** Available avatar sizes (diameter in Tailwind spacing). */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Online/offline status dot colors. */
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * Props for the Avatar component.
 */
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
  /** Image URL. Falls back to initials, then icon. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Initials shown when no image is provided or it fails to load. */
  initials?: string;
  /** Fallback icon shown when neither image nor initials are provided. */
  icon?: ReactNode;
  /** Shape. Defaults to `'circle'`. */
  shape?: AvatarShape;
  /** Size. Defaults to `'md'`. */
  size?: AvatarSize;
  /** Optional status indicator dot. */
  status?: AvatarStatus;
  /** Accessible label. Defaults to `alt`, then `initials`. */
  label?: string;
  /** Additional CSS classes on the root. */
  className?: string;
}
