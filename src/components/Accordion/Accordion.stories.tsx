import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const FAQ = [
  {
    value: 'billing',
    header: 'How does billing work?',
    content: (
      <p>
        You are charged once at the start of each cycle. Upgrade or downgrade anytime — we prorate
        the difference.
      </p>
    ),
  },
  {
    value: 'refunds',
    header: 'Can I get a refund?',
    content: (
      <p>Yes. Every paid plan includes a 30-day money-back guarantee, no questions asked.</p>
    ),
  },
  {
    value: 'support',
    header: 'How do I contact support?',
    content: <p>Email us at support@example.com. We respond within one business day.</p>,
  },
  {
    value: 'api',
    header: 'Is there an API?',
    disabled: true,
    content: <p>The public API ships in a future release — this item is disabled as a demo.</p>,
  },
];

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    items: FAQ,
  },
};

export const Multiple: Story = {
  args: {
    items: FAQ,
    type: 'multiple',
  },
};

export const NonCollapsible: Story = {
  args: {
    items: FAQ,
    collapsible: false,
  },
};

export const WithDefaultValue: Story = {
  args: {
    items: FAQ,
    defaultValue: ['refunds'],
  },
};

export const Controlled: Story = {
  render: (args) => <Accordion {...args} value={['billing']} />,
  args: {
    items: FAQ,
  },
};
