import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const CONTENT = {
  overview: (
    <p className="text-sm text-slate-600 dark:text-slate-300">
      Overview of your account activity, plans, and team members.
    </p>
  ),
  activity: (
    <p className="text-sm text-slate-600 dark:text-slate-300">
      Recent sign-ins, changes, and security events.
    </p>
  ),
  security: (
    <p className="text-sm text-slate-600 dark:text-slate-300">
      Manage password, two-factor authentication, and sessions.
    </p>
  ),
};

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Account',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    defaultValue: {
      control: 'select',
      options: ['overview', 'activity', 'security'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { value: 'overview', label: 'Overview', content: CONTENT.overview },
      { value: 'activity', label: 'Activity', content: CONTENT.activity },
      { value: 'security', label: 'Security', content: CONTENT.security },
    ],
    defaultValue: 'overview',
  },
};

export const Vertical: Story = {
  args: {
    items: [
      { value: 'overview', label: 'Overview', content: CONTENT.overview },
      { value: 'activity', label: 'Activity', content: CONTENT.activity },
      { value: 'security', label: 'Security', content: CONTENT.security },
    ],
    orientation: 'vertical',
    defaultValue: 'activity',
  },
};

export const DisabledTab: Story = {
  args: {
    items: [
      { value: 'overview', label: 'Overview', content: CONTENT.overview },
      { value: 'activity', label: 'Activity', content: CONTENT.activity },
      { value: 'security', label: 'Security', disabled: true, content: CONTENT.security },
    ],
    defaultValue: 'overview',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        value: 'overview',
        label: 'Overview',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
        content: CONTENT.overview,
      },
      {
        value: 'activity',
        label: 'Activity',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
        content: CONTENT.activity,
      },
    ],
  },
};
