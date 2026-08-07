import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Divider',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
};

export const WithLabel: Story = {
  args: {
    children: 'Continue',
  },
};

/** Vertical dividers need a fixed height from their parent. */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (StoryComponent) => (
      <div className="flex h-32 items-center">
        <StoryComponent />
      </div>
    ),
  ],
};
