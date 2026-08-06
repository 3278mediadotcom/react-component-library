import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="success"
        onClick={() => toast.success({ title: 'Saved', content: 'Your changes are saved.' })}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() => toast.error({ title: 'Failed', content: 'Something went wrong.' })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.info({ title: 'Heads up', content: 'An informational message.' })}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning({ title: 'Careful', content: 'A warning message.' })}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success({ content: 'This stays until dismissed.', duration: 0 })}
      >
        Persistent
      </Button>
    </div>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => <ToastDemo />,
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Stacking: Story = {
  render: () => {
    function StackDemo() {
      const toast = useToast();
      return (
        <Button
          onClick={() => {
            toast.info({ title: 'One', content: 'First toast' });
            toast.info({ title: 'Two', content: 'Second toast' });
            toast.info({ title: 'Three', content: 'Third toast' });
          }}
        >
          Push three toasts
        </Button>
      );
    }
    return <StackDemo />;
  },
};

export const Persistent: Story = {
  render: () => {
    function PersistentDemo() {
      const toast = useToast();
      return (
        <Button
          variant="outline"
          onClick={() =>
            toast.warning({
              title: 'Manual dismiss',
              content: 'This toast requires a click.',
              duration: 0,
            })
          }
        >
          Show persistent toast
        </Button>
      );
    }
    return <PersistentDemo />;
  },
};
