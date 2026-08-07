import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import type { DataTableProps } from './DataTable.types';

interface User {
  id: number;
  name: string;
  role: string;
  age: number;
  status: 'Active' | 'Away' | 'Offline';
}

const COLUMNS: DataTableProps<User>['columns'] = [
  { key: 'id', header: 'ID', width: '48px' },
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'age', header: 'Age', align: 'end' },
  { key: 'status', header: 'Status' },
];

const USERS: User[] = [
  { id: 1, name: 'Ada Lovelace', role: 'Analyst', age: 36, status: 'Active' },
  { id: 2, name: 'Rosalind Franklin', role: 'Scientist', age: 37, status: 'Active' },
  { id: 3, name: 'Katherine Johnson', role: 'Mathematician', age: 101, status: 'Away' },
  { id: 4, name: 'Grace Hopper', role: 'Engineer', age: 85, status: 'Active' },
  { id: 5, name: 'Marie Tharp', role: 'Cartographer', age: 84, status: 'Offline' },
  { id: 6, name: 'Dorothy Vaughan', role: 'Mathematician', age: 98, status: 'Away' },
  { id: 7, name: 'Barbara McClintock', role: 'Scientist', age: 90, status: 'Active' },
  { id: 8, name: 'Evelyn Boyd Granville', role: 'Mathematician', age: 92, status: 'Active' },
  { id: 9, name: 'Mary Jackson', role: 'Engineer', age: 83, status: 'Away' },
  { id: 10, name: 'Hedy Lamarr', role: 'Inventor', age: 85, status: 'Offline' },
  { id: 11, name: 'Katherine Esau', role: 'Scientist', age: 94, status: 'Active' },
  { id: 12, name: 'Chien-Shiung Wu', role: 'Scientist', age: 84, status: 'Active' },
  { id: 13, name: 'Radia Perlman', role: 'Engineer', age: 72, status: 'Away' },
  { id: 14, name: 'Karen Sparck Jones', role: 'Scientist', age: 72, status: 'Active' },
];

/**
 * Non-generic wrapper so Storybook can infer concrete `User` props.
 */
function UsersTable(props: DataTableProps<User>) {
  return <DataTable {...props} />;
}

const meta = {
  title: 'Data Display/DataTable',
  component: UsersTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    columns: COLUMNS,
    rows: USERS,
    label: 'Users',
  },
} satisfies Meta<typeof UsersTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Sortable: Story = {
  args: {
    defaultSortState: [{ columnId: 'age', direction: 'desc' }],
  },
};

export const Filterable: Story = {
  args: {
    filters: { role: 'Engineer' },
  },
};

export const Paginated: Story = {
  args: {
    defaultPageSize: 5,
  },
};

export const Loading: Story = {
  args: {
    rows: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    rows: [],
  },
};

export const RowSelection: Story = {};

export const ColumnVisibility: Story = {
  args: {
    visibleColumnOptions: COLUMNS.map((column) => ({
      key: column.key,
      label: String(column.header),
    })),
  },
};

export const WithCaption: Story = {
  args: {
    caption: 'Engineering roster — Q3 2026',
    striped: true,
    hover: true,
  },
};

export const LargeDataset: Story = {
  args: {
    rows: Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      name: `Member ${i + 1}`,
      role: ['Engineer', 'Designer', 'Manager'][i % 3],
      age: 20 + (i % 40),
      status: (['Active', 'Away', 'Offline'] as const)[i % 3],
    })),
    label: 'Members',
    defaultPageSize: 20,
    stickyHeader: true,
    maxHeight: 400,
  },
};

export const ServerSide: Story = {
  args: {
    serverSide: true,
  },
};

export const Exportable: Story = {
  args: {
    enableExport: true,
    exportFilename: 'users',
    striped: true,
  },
};
