/**
 * Public API for the React Component Library.
 *
 * ```ts
 * import { Button, Input, Card, Badge, Spinner } from 'react-component-library';
 * ```
 */
export { Button } from './components/Button';
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/Button';

export { Input } from './components/Input';
export type { InputProps, InputType } from './components/Input';

export { Card } from './components/Card';
export type { CardProps, CardVariant, CardPadding } from './components/Card';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeSize, BadgeVariant } from './components/Badge';

export { Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerVariant } from './components/Spinner';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { RadioGroup } from './components/RadioGroup';
export type { RadioGroupProps, RadioGroupOrientation, RadioOption } from './components/RadioGroup';

export { Breadcrumb } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb';

export { Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';

export { Tabs } from './components/Tabs';
export type { TabsProps, TabsOrientation, TabItem } from './components/Tabs';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Alert } from './components/Alert';
export type { AlertProps, AlertVariant } from './components/Alert';

export { ToastProvider, useToast } from './components/Toast';
export type {
  ToastApi,
  ToastItem,
  ToastOptions,
  ToastProviderProps,
  ToastVariant,
} from './components/Toast';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Drawer } from './components/Drawer';
export type { DrawerProps, DrawerPlacement } from './components/Drawer';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

export { Popover } from './components/Popover';
export type { PopoverProps, PopoverPlacement } from './components/Popover';

// ---------- Phase 4: Data Display & Layout ----------

export { Divider } from './components/Divider';
export type { DividerProps, DividerOrientation, DividerVariant } from './components/Divider';

export { Stack } from './components/Stack';
export type { StackProps, StackDirection, StackSpacing, StackAlignment } from './components/Stack';

export { Grid } from './components/Grid';
export type { GridProps, GridSpacing, GridBreakpoints } from './components/Grid';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps, SkeletonVariant, SkeletonAnimation } from './components/Skeleton';

export { Avatar } from './components/Avatar';
export type { AvatarProps, AvatarShape, AvatarSize, AvatarStatus } from './components/Avatar';

export { AvatarGroup } from './components/AvatarGroup';
export type {
  AvatarGroupProps,
  AvatarGroupItem,
  AvatarGroupSpacing,
} from './components/AvatarGroup';

export { Progress } from './components/Progress';
export type { ProgressProps, ProgressVariant, ProgressSize } from './components/Progress';

export { EmptyState } from './components/EmptyState';
export type { EmptyStateProps } from './components/EmptyState';

export { Accordion } from './components/Accordion';
export type { AccordionProps, AccordionItem } from './components/Accordion';

export { Table, TableHeaderCell, TableCell } from './components/Table';
export type {
  TableProps,
  TableColumn,
  TableSize,
  TableAlignment,
  TableHeaderCellProps,
  TableCellProps,
} from './components/Table';

export { DataTable } from './components/DataTable';
export type {
  DataTableProps,
  DataTableColumn,
  DataTableAlignment,
  DataTableVisibleColumn,
} from './components/DataTable';

// ---------- Shared hooks ----------

export { useTheme } from './hooks/useTheme';
export { ThemeProvider } from './providers/ThemeProvider';
export type { ThemeProviderProps } from './providers/ThemeProvider';
export type { ThemeMode, ThemeContextValue, ThemeStorage } from './types/theme';

export { useDebounce, useDebouncedCallback } from './hooks/useDebounce';
export { useResizeObserver } from './hooks/useResizeObserver';
export { useSorting } from './hooks/useSorting';
export type { SortState, SortDirection } from './hooks/useSorting';
export { usePagination } from './hooks/usePagination';
export { useSelection } from './hooks/useSelection';
