import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { BaseProps } from '../../types/common';

/** Visual variants for the button. */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

/** Available button sizes. */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'> {
  /** Visual variant. Defaults to `'primary'`. */
  variant?: ButtonVariant;
  /** Button size. Defaults to `'md'`. */
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction while `true`; announces via aria-busy. */
  loading?: boolean;
  /** Disables the button (removes from tab order, blocks interaction). */
  disabled?: boolean;
  /** Icon rendered before the label. Hidden from the accessibility tree. */
  leftIcon?: ReactNode;
  /** Icon rendered after the label. Hidden from the accessibility tree. */
  rightIcon?: ReactNode;
  /** Stretches the button to fill its container. */
  fullWidth?: boolean;
  /** Button type. Defaults to `'button'` to avoid accidental form submits. */
  type?: 'button' | 'submit' | 'reset';
  /** Button label. */
  children: ReactNode;
}
