import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { Avatar } from '../Avatar';
import { Tooltip } from '../Tooltip';
import type { AvatarGroupProps, AvatarGroupSpacing } from './AvatarGroup.types';

const OVERLAP_CLASSES: Record<AvatarGroupSpacing, string> = {
  sm: '-ml-1.5',
  md: '-ml-2.5',
  lg: '-ml-3.5',
};

const CHIP_SIZE_CLASSES: Record<NonNullable<AvatarGroupProps['size']>, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

/**
 * AvatarGroup — stacked avatars with overlap and an overflow chip.
 *
 * Renders up to `max` avatars, collapsing the remainder into a `+N` chip.
 * Each avatar keeps its own accessible name. When `showTooltip` is enabled
 * each avatar (and the chip) is wrapped in a Tooltip using `item.name`.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  {
    items,
    max = 5,
    size = 'md',
    shape = 'circle',
    spacing = 'md',
    showTooltip = false,
    label = 'Team',
    className,
    ...rest
  },
  ref,
) {
  const safeMax = Math.max(1, max);
  const visible = items.slice(0, safeMax);
  const overflowCount = items.length - visible.length;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={classNames('flex items-center', className)}
      {...rest}
    >
      {visible.map((item, index) => {
        const avatar = (
          <Avatar
            key={index}
            {...item}
            size={size}
            shape={shape}
            className={classNames(
              // Every avatar after the first overlaps the previous one.
              index > 0 && OVERLAP_CLASSES[spacing],
            )}
          />
        );

        if (showTooltip && item.name) {
          return (
            <Tooltip key={index} content={item.name}>
              {avatar}
            </Tooltip>
          );
        }
        return avatar;
      })}

      {overflowCount > 0 && (
        <span
          aria-hidden="true"
          className={classNames(
            'inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-slate-300 font-medium text-slate-700 ring-2 ring-white dark:bg-slate-600 dark:text-slate-100 dark:ring-slate-900',
            shape === 'circle'
              ? 'rounded-full'
              : shape === 'rounded'
                ? 'rounded-lg'
                : 'rounded-none',
            CHIP_SIZE_CLASSES[size],
            visible.length > 0 && OVERLAP_CLASSES[spacing],
          )}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  );
});

export default AvatarGroup;
