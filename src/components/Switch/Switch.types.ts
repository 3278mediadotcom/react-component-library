import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props for the Switch component.
 */
export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'className' | 'role' | 'onChange'
> {
  /** Whether the switch is on. Supports controlled usage. */
  checked?: boolean;
  /** Initial state for uncontrolled usage. */
  defaultChecked?: boolean;
  /** Called when the user toggles the switch. */
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label for the toggle (used as the accessible name). */
  label?: string;
  /** Disables the switch. */
  disabled?: boolean;
  /** Renders a spinner inside the thumb while busy. */
  loading?: boolean;
  /** Optional icon shown inside the thumb when on. */
  checkedIcon?: ReactNode;
  /** Optional icon shown inside the thumb when off. */
  uncheckedIcon?: ReactNode;
  /** Additional CSS classes applied to the wrapper. */
  className?: string;
}
