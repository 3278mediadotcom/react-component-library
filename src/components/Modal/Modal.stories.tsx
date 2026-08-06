import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Button } from '../Button';
import { Modal } from './Modal';

function ModalStory({ children, ...props }: ComponentProps<typeof Modal>) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={open} onClose={() => setOpen(false)} {...props}>
        {children}
      </Modal>
    </div>
  );
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <p className="text-sm text-slate-600 dark:text-slate-300">This is the default modal body.</p>
    </ModalStory>
  ),
  args: {
    title: 'Settings',
    description: 'Manage your preferences.',
  },
};

export const Large: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <div className="text-sm text-slate-600 dark:text-slate-300">
        <p>A larger modal with more room for content.</p>
        <ol className="mt-3 list-inside list-decimal">
          <li>First</li>
          <li>Second</li>
          <li>Third</li>
        </ol>
      </div>
    </ModalStory>
  ),
  args: {
    title: 'Details',
    size: 'lg',
  },
};

export const Confirmation: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <div className="flex gap-3">
        <Button>Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </ModalStory>
  ),
  args: {
    title: 'Delete project?',
    description: 'This action cannot be undone.',
  },
};

export const Scrollable: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i}>
            Scrollable content item {i + 1}. The panel is constrained to 90vh and scrolls
            internally.
          </p>
        ))}
      </div>
    </ModalStory>
  ),
  args: {
    title: 'Long form',
  },
};

export const NestedContent: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <div className="text-sm text-slate-600 dark:text-slate-300">
        <p>Modal content can contain any JSX — forms, lists, media, or other controls.</p>
        <Button className="mt-4">Inside action</Button>
      </div>
    </ModalStory>
  ),
  args: {
    title: 'Rich content',
  },
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Dismiss with Escape or by clicking the backdrop.
      </p>
    </ModalStory>
  ),
  args: {
    title: 'Persistent',
    showCloseButton: false,
  },
};
