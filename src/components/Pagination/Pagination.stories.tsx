import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    pageCount: 15,
    defaultPage: 8,
  },
  argTypes: {
    pageCount: { control: { type: 'number', min: 1 } },
    siblingCount: { control: { type: 'number', min: 0, max: 5 } },
    boundaryCount: { control: { type: 'number', min: 0, max: 5 } },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultPage: 8,
  },
};

export const StartOfRange: Story = {
  args: {
    pageCount: 15,
    defaultPage: 1,
  },
};

export const EndOfRange: Story = {
  args: {
    pageCount: 15,
    defaultPage: 15,
  },
};

export const ManyPages: Story = {
  args: {
    pageCount: 100,
    defaultPage: 50,
  },
};

export const SmallRange: Story = {
  args: {
    pageCount: 4,
    defaultPage: 2,
  },
};

export const Disabled: Story = {
  args: {
    pageCount: 10,
    defaultPage: 5,
    disabled: true,
  },
};

export const CustomBounds: Story = {
  args: {
    pageCount: 20,
    defaultPage: 10,
    boundaryCount: 2,
    siblingCount: 2,
  },
};
