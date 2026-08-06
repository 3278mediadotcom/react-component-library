import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import type { CardPadding, CardProps, CardVariant } from './Card.types';

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900',
  outlined: 'border-2 border-slate-800 bg-transparent dark:border-slate-200 dark:bg-transparent',
  elevated:
    'border border-transparent bg-white shadow-lg shadow-slate-200/60 dark:bg-slate-900 dark:shadow-slate-950/60',
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

/**
 * Card — a flexible content container with header, body, and footer regions.
 *
 * Renders semantic markup: `<article>` with a header/footer structure. Use
 * `hoverable` on interactive cards to communicate affordance.
 */
export const Card = forwardRef<HTMLDivElement, CardProps & HTMLAttributes<HTMLDivElement>>(
  function Card(
    {
      variant = 'default',
      title,
      subtitle,
      footer,
      padding = 'md',
      hoverable = false,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    const showHeader = Boolean(title || subtitle);

    return (
      <article
        ref={ref}
        className={classNames(
          'flex flex-col rounded-xl',
          VARIANT_CLASSES[variant],
          hoverable &&
            'transition-shadow hover:shadow-lg hover:shadow-slate-200/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:shadow-slate-950/70',
          className,
        )}
        {...rest}
      >
        {showHeader && (
          <header
            className={classNames(
              'border-b border-slate-200 dark:border-slate-800',
              PADDING_CLASSES[padding],
            )}
          >
            {title && (
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </header>
        )}
        <div className={classNames('h-full', PADDING_CLASSES[padding])}>{children}</div>
        {footer && (
          <footer
            className={classNames(
              'border-t border-slate-200 dark:border-slate-800',
              PADDING_CLASSES[padding],
            )}
          >
            {footer}
          </footer>
        )}
      </article>
    );
  },
);

export default Card;
