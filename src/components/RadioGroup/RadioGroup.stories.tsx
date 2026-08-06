import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { value: 'starter', label: 'Starter', helperText: 'For side projects' },
  { value: 'pro', label: 'Pro', helperText: 'For growing teams' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'plan',
    options: OPTIONS,
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Billing plan',
    defaultValue: 'starter',
  },
};

export const Unselected: Story = {
  args: {
    label: 'Billing plan',
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Billing plan',
    orientation: 'horizontal',
    defaultValue: 'pro',
  },
};

export const DisabledGroup: Story = {
  args: {
    label: 'Billing plan',
    defaultValue: 'starter',
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Billing plan',
    helperText: 'You can switch plans at any time.',
    defaultValue: 'pro',
  },
};

export const WithError: Story = {
  args: {
    label: 'Billing plan',
    error: 'Please select a plan.',
  },
};
