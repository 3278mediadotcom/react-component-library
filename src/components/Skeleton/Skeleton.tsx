import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { classNames } from '../../utils/classNames';
import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

const VARIANT_DIMENSIONS: Record<SkeletonVariant, string> = {
  text: 'h-4',
  avatar: 'h-12 w-12',
  button: 'h-10 w-28',
  card: 'h-40 w-full',
  image: 'aspect-video w-full',
};

const VARIANT_SHAPE: Record<SkeletonVariant, string> = {
  text: 'rounded',
  avatar: 'rounded-full',
  button: 'rounded-lg',
  card: 'rounded-xl',
  image: 'rounded-xl',
};

/**
 * Skeleton — placeholder shapes for loading content.
 *
 * Decorative by default (`aria-hidden`) so screen readers never announce
 * loading chrome; pair with a `role="status"`/`aria-busy` container for
 * announced loading states.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    variant = 'text',
    animation = 'pulse',
    width,
    height,
    rounded,
    decorative = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const styleProps = {
    ...(width !== undefined ? { width: toCssLength(width) } : {}),
    ...(height !== undefined ? { height: toCssLength(height) } : {}),
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      aria-hidden={decorative || undefined}
      className={classNames(
        'select-none bg-slate-200 dark:bg-slate-700',
        VARIANT_DIMENSIONS[variant],
        animation === 'pulse' ? 'animate-pulse' : 'animate-skeleton-wave',
        rounded ? 'rounded-lg' : VARIANT_SHAPE[variant],
        className,
      )}
      style={styleProps}
      {...rest}
    />
  );
});

/** Converts a number to a pixel length (mirrors the React `style` API). */
function toCssLength(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export default Skeleton;
