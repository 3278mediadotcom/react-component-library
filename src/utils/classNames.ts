/**
 * Combines class names, filtering out falsy values.
 *
 * Accepts strings and objects/arrays via the standard `clsx`-style API.
 * The implementation is intentionally dependency-free and tiny (~200 bytes),
 * which keeps the component library lightweight.
 *
 * @example
 * classNames('btn', isActive && 'btn--active', { 'btn--disabled': disabled })
 * // => "btn btn--active btn--disabled"
 */
type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

export function classNames(...values: ClassValue[]): string {
  const classes: string[] = [];

  const add = (value: ClassValue): void => {
    if (typeof value === 'string' && value) {
      classes.push(value);
    } else if (typeof value === 'number' && value !== 0 && Number.isFinite(value)) {
      classes.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(add);
    } else if (typeof value === 'object' && value !== null) {
      for (const key of Object.keys(value)) {
        if (value[key]) {
          classes.push(key);
        }
      }
    }
  };

  values.forEach(add);
  return classes.join(' ').trim();
}

export default classNames;
