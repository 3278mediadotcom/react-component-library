import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from './AvatarGroup';

const TEAM = [
  { initials: 'AL', label: 'Ada Lovelace', name: 'Ada Lovelace' },
  { initials: 'RF', label: 'Rosalind Franklin', name: 'Rosalind Franklin' },
  { initials: 'MT', label: 'Marie Tharp', name: 'Marie Tharp' },
  { initials: 'KH', label: 'Katherine Johnson', name: 'Katherine Johnson' },
  { initials: 'GC', label: 'Grace Hopper', name: 'Grace Hopper' },
  { initials: 'DC', label: 'Dorothy Hodgkin', name: 'Dorothy Hodgkin' },
  { initials: 'BG', label: 'Barbara McClintock', name: 'Barbara McClintock' },
  { initials: 'EC', label: 'Evelyn Boyd Granville', name: 'Evelyn Boyd Granville' },
];

const meta = {
  title: 'Data Display/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    items: TEAM,
    label: 'Contributors',
  },
  argTypes: {
    max: {
      control: { type: 'number', min: 1, max: 10 },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: TEAM,
    label: 'Contributors',
  },
};

export const Overflow: Story = {
  args: {
    items: TEAM,
    max: 3,
    label: 'Contributors',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <AvatarGroup items={TEAM} size="xs" label="XS" />
      <AvatarGroup items={TEAM} size="sm" label="SM" />
      <AvatarGroup items={TEAM} size="md" label="MD" />
      <AvatarGroup items={TEAM} size="lg" label="LG" />
      <AvatarGroup items={TEAM} size="xl" label="XL" />
    </div>
  ),
};

export const TightOverlap: Story = {
  args: {
    items: TEAM,
    spacing: 'sm',
    label: 'Contributors',
  },
};

export const WithTooltips: Story = {
  args: {
    items: TEAM,
    max: 4,
    showTooltip: true,
    label: 'Contributors',
  },
};
