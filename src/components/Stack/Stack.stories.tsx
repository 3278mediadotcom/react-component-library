import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const BOXES = (
  <>
    <div className="rounded bg-blue-500 p-4 text-white">One</div>
    <div className="rounded bg-blue-500 p-4 text-white">Two</div>
    <div className="rounded bg-blue-500 p-4 text-white">Three</div>
  </>
);

export const Vertical: Story = {
  args: {
    children: BOXES,
    spacing: 'md',
  },
};

export const Horizontal: Story = {
  args: {
    children: BOXES,
    direction: 'row',
    spacing: 'md',
  },
};

export const Centered: Story = {
  args: {
    children: BOXES,
    direction: 'row',
    justify: 'center',
    align: 'center',
    className: 'h-40',
  },
};

export const Between: Story = {
  args: {
    children: BOXES,
    direction: 'row',
    justify: 'between',
  },
};

export const Wrapping: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="rounded bg-blue-500 p-4 text-white">
            Item {i + 1}
          </div>
        ))}
      </>
    ),
    direction: 'row',
    wrap: true,
    className: 'max-w-md',
  },
};
