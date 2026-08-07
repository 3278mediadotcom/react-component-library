import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

const meta = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'No results yet',
    description: 'Create your first record to see it here.',
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No results yet',
    description: 'Create your first record to see it here.',
  },
};

export const WithIllustration: Story = {
  args: {
    title: 'No results yet',
    description: 'Create your first record to see it here.',
    illustration: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M21 3 12 12" />
        <path d="M21 3v6" />
      </svg>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: 'No results yet',
    description: 'Invite a teammate to start collaborating.',
    action: <Button size="sm">Invite teammate</Button>,
    secondaryAction: (
      <Button size="sm" variant="outline">
        Learn more
      </Button>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    title: 'Storage is empty',
    description: 'Upload a file to get started.',
    layout: 'horizontal',
    illustration: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
    action: <Button size="sm">Upload</Button>,
  },
};

/** EmptyState is the default content inside a DataTable when rows are empty. */
export const InTable: Story = {
  render: () => (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800">
      <EmptyState
        title="No projects found"
        description="Try adjusting your filters or create a new project."
        action={<Button size="sm">New project</Button>}
      />
    </div>
  ),
};
