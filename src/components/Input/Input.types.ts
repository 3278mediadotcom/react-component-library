import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types/common';

/** Supported native input types. */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'url';

/**
 * Props for the Input component.
 */
export interface InputProps
  extends
    BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'size' | 'prefix'> {
  /** Native input type. Defaults to `'text'`. */
  type?: InputType;
  /** Visible label associated with the input via htmlFor/id. */
  label?: string;
  /** Placeholder text shown when the input is empty. */
  placeholder?: string;
  /** Helper text rendered below the input. */
  helperText?: string;
  /** Error message; switches the input to an invalid state and wires aria. */
  error?: string;
  /** Disables the input. */
  disabled?: boolean;
  /** Marks the field as required and applies aria-required. */
  required?: boolean;
  /** Content rendered before the input (e.g. a currency symbol). */
  prefix?: ReactNode;
  /** Content rendered after the input (e.g. a clear button). */
  suffix?: ReactNode;
  /** Icon rendered on the left side of the input. */
  leftIcon?: ReactNode;
  /** Icon rendered on the right side of the input. */
  rightIcon?: ReactNode;
}
