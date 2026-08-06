import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p className="text-slate-600 dark:text-slate-300">Simple card body content.</p>,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: <p className="text-slate-600 dark:text-slate-300">Outlined card body content.</p>,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: <p className="text-slate-600 dark:text-slate-300">Elevated card with shadow.</p>,
  },
};

export const ProfileCard: Story = {
  args: {
    title: 'Ada Lovelace',
    subtitle: 'Mathematician & writer',
    children: (
      <p className="text-slate-600 dark:text-slate-300">
        Analytical Engine pioneer credited with writing the first algorithm.
      </p>
    ),
    footer: (
      <Button variant="secondary" size="sm">
        View profile
      </Button>
    ),
  },
};

export const PricingCard: Story = {
  args: {
    variant: 'elevated',
    title: 'Pro plan',
    children: (
      <div>
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          $29<span className="text-sm font-normal text-slate-500">/month</span>
        </p>
        <ul className="mt-3 list-inside list-disc text-sm text-slate-600 dark:text-slate-300">
          <li>Unlimited projects</li>
          <li>Team collaboration</li>
          <li>Priority support</li>
        </ul>
      </div>
    ),
    footer: <Button fullWidth>Get started</Button>,
  },
};

export const DashboardCard: Story = {
  args: {
    title: 'Revenue',
    subtitle: 'Last 30 days',
    children: (
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">$48,290</span>
        <Badge variant="success" dot>
          +12.5%
        </Badge>
      </div>
    ),
  },
};

export const StatisticCard: Story = {
  args: {
    title: 'Active users',
    hoverable: true,
    children: <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">8,472</p>,
  },
};
