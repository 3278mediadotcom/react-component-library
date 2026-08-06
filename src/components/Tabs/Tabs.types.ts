import type { HTMLAttributes, ReactNode } from 'react';

/** Layout orientation for the tab list. */
export type TabsOrientation = 'horizontal' | 'vertical';

/** A single tab descriptor. */
export interface TabItem {
  /** Stable value used for selection. */
  value: string;
  /** Tab label. */
  label: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Disables the tab. */
  disabled?: boolean;
  /** Panel content shown when this tab is active. */
  content?: ReactNode;
}

/**
 * Props for the Tabs component.
 */
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'className'> {
  /** Tab descriptors. */
  items: TabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initial active tab (uncontrolled). Defaults to the first non-disabled tab. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Layout orientation. Defaults to `'horizontal'`. */
  orientation?: TabsOrientation;
  /** Accessible label for the tablist. */
  label: string;
  /** Additional CSS classes on the root. */
  className?: string;
}
