import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Button } from '../Button';
import { Drawer } from './Drawer';

function DrawerStory({ children, ...props }: ComponentProps<typeof Drawer>) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} {...props}>
        {children}
      </Drawer>
    </div>
  );
}

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: (args) => (
    <DrawerStory {...args}>
      <p className="text-sm text-slate-600 dark:text-slate-300">Slides in from the right edge.</p>
    </DrawerStory>
  ),
  args: {
    title: 'Cart',
    placement: 'right',
  },
};

export const Left: Story = {
  render: (args) => (
    <DrawerStory {...args}>
      <p className="text-sm text-slate-600 dark:text-slate-300">Slides in from the left edge.</p>
    </DrawerStory>
  ),
  args: {
    title: 'Menu',
    placement: 'left',
  },
};

export const Top: Story = {
  render: (args) => (
    <DrawerStory {...args}>
      <p className="text-sm text-slate-600 dark:text-slate-300">Slides down from the top edge.</p>
    </DrawerStory>
  ),
  args: {
    title: 'Notifications',
    placement: 'top',
  },
};

export const Bottom: Story = {
  render: (args) => (
    <DrawerStory {...args}>
      <p className="text-sm text-slate-600 dark:text-slate-300">Slides up from the bottom edge.</p>
    </DrawerStory>
  ),
  args: {
    title: 'Actions',
    placement: 'bottom',
  },
};

export const FormInDrawer: Story = {
  render: (args) => (
    <DrawerStory {...args}>
      <div className="flex flex-col gap-3">
        <label
          htmlFor="drawer-email"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <input
          id="drawer-email"
          type="email"
          placeholder="you@example.com"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <Button>Save profile</Button>
      </div>
    </DrawerStory>
  ),
  args: {
    title: 'Edit profile',
  },
};
