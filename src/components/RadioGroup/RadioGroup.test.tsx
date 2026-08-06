import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
];

const GROUP_NAME = 'fruit';

describe('RadioGroup', () => {
  it('renders a radiogroup with all options', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} label="Pick a fruit" />);
    expect(screen.getByRole('radiogroup', { name: 'Pick a fruit' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('applies the group name to all inputs', () => {
    const { container } = render(
      <RadioGroup name={GROUP_NAME} options={[{ value: 'apple', label: 'Apple' }]} />,
    );
    expect(container.querySelector('input')).toHaveAttribute('name', GROUP_NAME);
  });

  it('selects the defaultValue', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} defaultValue="banana" />);
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
  });

  it('supports controlled usage', () => {
    render(
      <RadioGroup
        name={GROUP_NAME}
        options={OPTIONS}
        value="apple"
        onValueChange={() => undefined}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
  });

  it('fires onValueChange when an option is clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('radio', { name: 'Banana' }));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('selects an option on click', async () => {
    const user = userEvent.setup();
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} />);
    const banana = screen.getByRole('radio', { name: 'Banana' });
    await user.click(banana);
    expect(banana).toBeChecked();
  });

  it('moves selection with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} defaultValue="apple" />);
    const apple = screen.getByRole('radio', { name: 'Apple' });
    await user.tab();
    expect(apple).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
  });

  it('skips disabled options during arrow navigation', async () => {
    const user = userEvent.setup();
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} defaultValue="banana" />);
    const banana = screen.getByRole('radio', { name: 'Banana' });
    await user.tab();
    expect(banana).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    // Cherry is disabled; focus should remain on Banana (no movement).
    expect(banana).toHaveFocus();
  });

  it('moves selection with ArrowRight in horizontal orientation', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup
        name={GROUP_NAME}
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
        orientation="horizontal"
        defaultValue="a"
      />,
    );
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
  });

  it('jumps to the first option with Home', async () => {
    const user = userEvent.setup();
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} defaultValue="banana" />);
    await user.tab();
    await user.keyboard('{Home}');
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
  });

  it('jumps to the last enabled option with End', async () => {
    const user = userEvent.setup();
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} defaultValue="apple" />);
    await user.tab();
    await user.keyboard('{End}');
    // Cherry is disabled, so end lands on Banana.
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
  });

  it('keeps only one radio in the tab order via roving tabindex', () => {
    const { container } = render(
      <RadioGroup name={GROUP_NAME} options={OPTIONS} defaultValue="apple" />,
    );
    const inputs = container.querySelectorAll('input[type="radio"]');
    const tabbable = Array.from(inputs).filter((i) => i.getAttribute('tabindex') === '0');
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAttribute('value', 'apple');
  });

  it('makes the first enabled option tabbable when nothing is selected', () => {
    const { container } = render(<RadioGroup name={GROUP_NAME} options={OPTIONS} />);
    const inputs = container.querySelectorAll('input[type="radio"]');
    const tabbable = Array.from(inputs).filter((i) => i.getAttribute('tabindex') === '0');
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAttribute('value', 'apple');
  });

  it('disables all radios when the group is disabled', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} disabled />);
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('disables a single option', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} />);
    expect(screen.getByRole('radio', { name: 'Cherry' })).toBeDisabled();
  });

  it('renders helper text', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} helperText="Choose one" />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('wires helper text via aria-describedby', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} helperText="Choose one" />);
    const group = screen.getByRole('radiogroup');
    const describedBy = group.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent('Choose one');
  });

  it('renders an error message', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} error="Pick something" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Pick something');
  });

  it('sets aria-invalid on the group when an error is present', () => {
    render(<RadioGroup name={GROUP_NAME} options={OPTIONS} error="Pick something" />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup name={GROUP_NAME} options={OPTIONS} className="my-group" />,
    );
    expect(container.querySelector('div')).toHaveClass('my-group');
  });
});
