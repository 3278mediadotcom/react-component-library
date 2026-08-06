import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const FRUITS = [
  { value: 'apple', label: 'Apple', hint: 'Malus domestica' },
  { value: 'banana', label: 'Banana', hint: 'Musa acuminata' },
  { value: 'cherry', label: 'Cherry', hint: 'Prunus avium' },
  { value: 'date', label: 'Date' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    placeholder: 'Select a fruit',
  },
};

export const WithSelection: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    defaultValue: 'banana',
  },
};

export const Disabled: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    defaultValue: 'apple',
    disabled: true,
  },
};

export const Clearable: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    defaultValue: 'cherry',
    clearable: true,
  },
};

export const Required: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    required: true,
    placeholder: 'Select a fruit',
  },
};

export const WithHelperText: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    helperText: 'Choose the fruit you like most.',
  },
};

export const WithError: Story = {
  args: {
    options: FRUITS,
    label: 'Favorite fruit',
    error: 'Please choose a fruit.',
  },
};
