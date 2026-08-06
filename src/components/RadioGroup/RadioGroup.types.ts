import type { ReactNode } from 'react';

/** Layout orientation for the radio group. */
export type RadioGroupOrientation = 'horizontal' | 'vertical';

/** A single selectable option. */
export interface RadioOption {
  /** Stable value returned by `onValueChange`. */
  value: string;
  /** Visible label rendered next to the radio. */
  label?: ReactNode;
  /** Helper text specific to this option. */
  helperText?: string;
  /** Disables this option. */
  disabled?: boolean;
}

/**
 * Props for the RadioGroup component.
 */
export interface RadioGroupProps {
  /** Options to render. */
  options: RadioOption[];
  /** Name used for form submission and native input name attributes. */
  name: string;
  /** Controlled selected value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Optional legend/label describing the group. */
  label?: ReactNode;
  /** Help text shown below the group. */
  helperText?: string;
  /** Error message; sets error group state. */
  error?: string;
  /** Disables the whole group. */
  disabled?: boolean;
  /** Marks the group as required (applies required to a hidden input). */
  required?: boolean;
  /** Arrangement of the radios. Defaults to `'vertical'`. */
  orientation?: RadioGroupOrientation;
  /** Additional CSS classes on the wrapper. */
  className?: string;
}
