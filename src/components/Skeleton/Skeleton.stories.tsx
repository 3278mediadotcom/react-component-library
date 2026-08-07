import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import { Stack } from '../Stack';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'avatar', 'button', 'card', 'image'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '12rem',
  },
};

export const Avatar: Story = {
  args: {
    variant: 'avatar',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
  },
};

export const Image: Story = {
  args: {
    variant: 'image',
  },
};

export const Wave: Story = {
  args: {
    variant: 'card',
    animation: 'wave',
  },
};

export const ProfileCard: Story = {
  render: () => (
    <div className="w-72 rounded-xl border border-slate-200 p-6 shadow-sm dark:border-slate-800">
      <Stack direction="row" spacing="md" align="center">
        <Skeleton variant="avatar" />
        <Stack spacing="xs" className="flex-1">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </Stack>
      </Stack>
      <Stack spacing="sm" className="mt-4">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </Stack>
    </div>
  ),
};
