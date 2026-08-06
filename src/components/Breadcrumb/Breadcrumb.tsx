import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import type { BreadcrumbProps } from './Breadcrumb.types';

/**
 * Breadcrumb — a navigation aid showing the current page's position.
 *
 * Renders a `nav` landmark with an ordered list. The last item is marked with
 * `aria-current="page"` and rendered as plain text (not a link) per best
 * practice, since linking to the current page is confusing.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps & HTMLAttributes<HTMLElement>>(
  function Breadcrumb({ items, label = 'Breadcrumb', className, ...rest }, ref) {
    return (
      <nav ref={ref} aria-label={label} className={classNames('text-sm', className)} {...rest}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrent = item.current ?? isLast;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 text-slate-400"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}

                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-slate-900 dark:text-slate-100"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="rounded text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

export default Breadcrumb;
