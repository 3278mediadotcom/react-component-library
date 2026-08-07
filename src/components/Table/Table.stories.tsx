import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableCell, TableHeaderCell } from './Table';

const USERS = [
  { id: 1, name: 'Ada Lovelace', role: 'Analyst', status: 'Active' },
  { id: 2, name: 'Rosalind Franklin', role: 'Scientist', status: 'Active' },
  { id: 3, name: 'Katherine Johnson', role: 'Mathematician', status: 'Away' },
  { id: 4, name: 'Grace Hopper', role: 'Engineer', status: 'Active' },
];

const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const TABLE_CONTENT = (
  <>
    <thead>
      <tr>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Role</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
      </tr>
    </thead>
    <tbody>
      {USERS.map((user) => (
        <tr key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.status}</TableCell>
        </tr>
      ))}
    </tbody>
  </>
);

export const Default: Story = {
  args: {
    caption: 'Team members',
    children: TABLE_CONTENT,
  },
};

export const Striped: Story = {
  args: {
    caption: 'Team members',
    striped: true,
    children: TABLE_CONTENT,
  },
};

export const Hoverable: Story = {
  args: {
    caption: 'Team members',
    hover: true,
    children: TABLE_CONTENT,
  },
};

export const Compact: Story = {
  args: {
    caption: 'Team members',
    size: 'sm',
    children: TABLE_CONTENT,
  },
};

export const WithFooter: Story = {
  args: {
    caption: 'Q3 budget',
    children: (
      <>
        <thead>
          <tr>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell align="end">Spent</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell>Engineering</TableCell>
            <TableCell align="end">$48,000</TableCell>
          </tr>
          <tr>
            <TableCell>Design</TableCell>
            <TableCell align="end">$12,000</TableCell>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="font-semibold">Total</TableCell>
            <TableCell align="end" className="font-semibold">
              $60,000
            </TableCell>
          </tr>
        </tfoot>
      </>
    ),
  },
};

export const StickyHeader: Story = {
  args: {
    caption: 'Large dataset',
    stickyHeader: true,
    maxHeight: 240,
    children: (
      <>
        <thead>
          <tr>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 30 }, (_, i) => (
            <tr key={i}>
              <TableCell>Member {i + 1}</TableCell>
              <TableCell>Role {i + 1}</TableCell>
              <TableCell>Active</TableCell>
            </tr>
          ))}
        </tbody>
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    responsive: true,
    children: (
      <>
        <thead>
          <tr>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {USERS.map((user) => (
            <tr key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </tr>
          ))}
        </tbody>
      </>
    ),
  },
};
