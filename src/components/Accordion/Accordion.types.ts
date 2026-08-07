import type { HTMLAttributes, ReactNode } from 'react';

/** A single accordion item descriptor. */
export interface AccordionItem {
  /** Stable value identifying the item. */
  value: string;
  /** Header (trigger) content. */
  header: ReactNode;
  /** Panel content revealed when open. */
  content: ReactNode;
  /** Disables the trigger. */
  disabled?: boolean;
}

/**
 * Props for the Accordion component.
 */
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Item descriptors. */
  items: AccordionItem[];
  /** Controlled open values. Pass to control the open set. */
  value?: string[];
  /** Initial open values (uncontrolled). */
  defaultValue?: string[];
  /** Called whenever the open set changes. */
  onValueChange?: (value: string[]) => void;
  /** Allow multiple items to be open at once.
   *  When false, opening one closes the others. Defaults to `false`. */
  type?: 'single' | 'multiple';
  /** Collapses an item when its own trigger is activated again.
   *  Only applies to `type="single"`. Defaults to `true`. */
  collapsible?: boolean;
  /** Additional CSS classes on the root. */
  className?: string;
}
