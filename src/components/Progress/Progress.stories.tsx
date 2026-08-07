import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';
import { Stack } from '../Stack';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {
  args: {
    value: 60,
    label: 'Upload progress',
  },
};

export const WithValue: Story = {
  args: {
    value: 34,
    label: 'Storage used',
    showValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    value: 72,
    label: 'Install progress',
  },
};

export const CircularIndeterminate: Story = {
  args: {
    variant: 'circular',
    indeterminate: true,
    label: 'Loading',
  },
};

export const Colors: Story = {
  render: () => (
    <Stack spacing="lg" className="w-64">
      <Progress value={80} label="Primary" color="primary" />
      <Progress value={60} label="Success" color="success" />
      <Progress value={40} label="Warning" color="warning" />
      <Progress value={20} label="Danger" color="danger" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing="lg" align="center">
      <Progress variant="circular" value={70} size="sm" label="Small" />
      <Progress variant="circular" value={70} size="md" label="Medium" />
      <Progress variant="circular" value={70} size="lg" label="Large" />
    </Stack>
  ),
};
