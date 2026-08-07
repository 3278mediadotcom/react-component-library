import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { Stack } from '../Stack';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: {
    initials: 'AL',
    label: 'Ada Lovelace',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/128?img=5',
    alt: 'Profile picture',
    label: 'Ada Lovelace',
  },
};

export const WithFallbackIcon: Story = {
  args: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    label: 'Unknown user',
  },
};

export const StatusDot: Story = {
  args: {
    initials: 'RS',
    status: 'online',
    label: 'Rosalind Franklin',
  },
};

export const Shapes: Story = {
  render: () => (
    <Stack direction="row" spacing="lg" align="center">
      <Avatar initials="C" shape="circle" label="Circle" />
      <Avatar initials="R" shape="rounded" label="Rounded" />
      <Avatar initials="S" shape="square" label="Square" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing="lg" align="center">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </Stack>
  ),
};
