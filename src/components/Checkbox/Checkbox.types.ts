import type { InputHTMLAttributes } from 'react';

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'className'
> {
  /** Visible label rendered next to the checkbox. */
  label?: string;
  /** Helper text rendered below the control. */
  helperText?: string;
  /** Error message; switches the control to an invalid state and wires aria. */
  error?: string;
  /** Disables the checkbox. */
  disabled?: boolean;
  /** True when the mixed state should be shown. */
  indeterminate?: boolean;
  /** Additional CSS classes applied to the wrapper. */
  className?: string;
}
