import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['className'] },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'light', 'dark'],
    },
    label: { control: 'text' },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Saving changes…',
  },
};
