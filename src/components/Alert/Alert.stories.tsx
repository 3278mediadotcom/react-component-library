import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
    },
    dismissible: { control: 'boolean' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'A new version of the library is available.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Almost there',
    children: 'You have unsaved changes that will be lost.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Deletion failed',
    children: 'The project could not be deleted. Try again.',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Note',
    children: 'This is a neutral informational message.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'Click the X to dismiss this alert.',
    dismissible: true,
  },
};

export const NoTitle: Story = {
  args: {
    variant: 'success',
    children: 'A compact, title-less success message.',
  },
};
