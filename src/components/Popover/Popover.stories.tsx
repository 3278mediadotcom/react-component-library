import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Popover } from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu: Story = {
  render: (args) => (
    <Popover
      {...args}
      content={
        <div className="flex w-44 flex-col gap-1">
          <button className="rounded px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            Profile
          </button>
          <button className="rounded px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            Settings
          </button>
          <button className="rounded px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
            Sign out
          </button>
        </div>
      }
    >
      <Button variant="outline">User menu</Button>
    </Popover>
  ),
  args: {
    placement: 'bottom',
    closeOnItemClick: true,
    'aria-label': 'User menu',
  },
};

export const FormPopover: Story = {
  render: (args) => (
    <Popover
      {...args}
      content={
        <form className="flex w-56 flex-col gap-2">
          <label
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
            htmlFor="popover-email"
          >
            Email
          </label>
          <input
            id="popover-email"
            type="email"
            defaultValue="you@example.com"
            className="rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
          <Button size="sm">Subscribe</Button>
        </form>
      }
    >
      <Button variant="outline">Newsletter</Button>
    </Popover>
  ),
  args: {
    placement: 'bottom',
  },
};

export const ProfileCard: Story = {
  render: (args) => (
    <Popover
      {...args}
      content={
        <div className="flex w-56 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            AL
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Ada Lovelace</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">ada@analytical.engine</p>
          </div>
        </div>
      }
    >
      <Button variant="ghost">View profile</Button>
    </Popover>
  ),
  args: {
    placement: 'right',
  },
};
