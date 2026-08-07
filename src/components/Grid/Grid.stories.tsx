import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const BOXES = (
  <>
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="rounded bg-blue-500 p-4 text-center text-white">
        {i + 1}
      </div>
    ))}
  </>
);

export const FixedColumns: Story = {
  args: {
    children: BOXES,
    columns: 3,
    gap: 'md',
  },
};

export const Responsive: Story = {
  args: {
    children: BOXES,
    columns: 1,
    breakpoints: { sm: 2, lg: 3 },
    gap: 'md',
  },
};

export const AutoFit: Story = {
  args: {
    children: BOXES,
    autoFit: true,
    minColumnWidth: '180px',
    gap: 'md',
  },
};

export const AutoFill: Story = {
  args: {
    children: BOXES,
    autoFill: true,
    minColumnWidth: '180px',
    gap: 'md',
  },
};

export const CustomTemplate: Story = {
  args: {
    children: BOXES,
    columns: '2fr 1fr',
    gap: 'md',
  },
};
