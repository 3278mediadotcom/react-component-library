/** A single selectable option. */
export interface SelectOption {
  /** Stable value returned by `onValueChange`. */
  value: string;
  /** Option label rendered in the listbox. */
  label: string;
  /** Disables the option. */
  disabled?: boolean;
  /** Optional hint shown next to the label. */
  hint?: string;
}

/**
 * Props for the Select component.
 */
export interface SelectProps {
  /** Options to render in the listbox. */
  options: SelectOption[];
  /** Controlled selected value (empty string means no selection). */
  value?: string;
  /** Initial selection for uncontrolled usage. */
  defaultValue?: string;
  /** Called with the new value when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Disables the whole select. */
  disabled?: boolean;
  /** Visible label associated with the combobox. */
  label?: string;
  /** Helper text wired via `aria-describedby`. */
  helperText?: string;
  /** Error message; sets `aria-invalid`. */
  error?: string;
  /** Marks the control as required (visual + native semantics). */
  required?: boolean;
  /** Shows a clear button when a value is selected. */
  clearable?: boolean;
  /** Accessible label for the clear button. Defaults to `'Clear selection'`. */
  clearLabel?: string;
  /** Additional CSS classes on the wrapper. */
  className?: string;
}
