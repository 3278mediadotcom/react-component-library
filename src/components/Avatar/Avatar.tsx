import { forwardRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import type { AvatarProps, AvatarShape, AvatarSize, AvatarStatus } from './Avatar.types';

const SHAPE_CLASSES: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

const STATUS_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

/**
 * Avatar — displays a user image, falling back to initials, then an icon.
 *
 * Renders a `<span>` with a decorative background; the accessible label is
 * exposed via `aria-label` (defaulting to `alt`, then `initials`).
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, initials, icon, shape = 'circle', size = 'md', status, label, className, ...rest },
  ref,
) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = src && !imgFailed;
  const accessibleLabel = label ?? alt ?? initials ?? 'Avatar';

  return (
    <span
      ref={ref}
      role="img"
      aria-label={accessibleLabel}
      className={classNames(
        'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-slate-200 font-medium text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-200 dark:ring-slate-900',
        SHAPE_CLASSES[shape],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : initials ? (
        <span aria-hidden="true">{initials}</span>
      ) : icon ? (
        <span aria-hidden="true" className="flex [&>svg]:h-1/2 [&>svg]:w-1/2">
          {icon}
        </span>
      ) : null}

      {status && (
        <span
          aria-hidden="true"
          className={classNames(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-slate-900',
            STATUS_CLASSES[status],
            STATUS_SIZE_CLASSES[size],
          )}
        />
      )}
    </span>
  );
});

export default Avatar;
