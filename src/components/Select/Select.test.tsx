import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const OPEN_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'pineapple', label: 'Pineapple', disabled: true },
  { value: 'banana', label: 'Banana' },
];

describe('Select', () => {
  it('renders a combobox', () => {
    render(<Select options={OPTIONS} label="Fruit" />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
  });

  it('renders the placeholder when nothing is selected', () => {
    render(<Select options={OPTIONS} label="Fruit" placeholder="Choose…" />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Choose…');
  });

  it('shows the selected option label', () => {
    render(<Select options={OPTIONS} label="Fruit" defaultValue="banana" />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana');
  });

  it('supports controlled usage', () => {
    render(
      <Select options={OPTIONS} label="Fruit" value="cherry" onValueChange={() => undefined} />,
    );
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Cherry');
  });

  it('opens the listbox on click', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the listbox on a second click', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    await user.click(combobox);
    await user.click(combobox);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens the listbox with Enter', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens the listbox with Space', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes the listbox with Escape', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects an option by clicking it', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana');
  });

  it('fires onValueChange when an option is clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select options={OPTIONS} label="Fruit" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('moves active option with ArrowDown and selects with Enter', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Cherry');
  });

  it('moves active option with ArrowUp and selects with Enter', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');
    await user.keyboard('{Enter}');
    // ArrowUp from index 0 clamps to 0 → selects Apple.
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
  });

  it('jumps to the last option with End', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{End}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Date');
  });

  it('jumps to the first option with Home', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{End}');
    await user.keyboard('{Home}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
  });

  it('supports type-ahead navigation', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('b');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Banana');
  });

  it('supports multi-character type-ahead refinement within one session', async () => {
    const user = userEvent.setup();
    render(
      <Select
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'apricot', label: 'Apricot' },
          { value: 'avocado', label: 'Avocado' },
        ]}
        label="Fruit"
      />,
    );
    await user.tab();
    // "ap" → Apple is the first option starting with "ap".
    await user.keyboard('{ArrowDown}');
    await user.keyboard('a');
    await user.keyboard('p');
    const activeAfterAp = document.getElementById(
      screen.getByRole('combobox').getAttribute('aria-activedescendant') as string,
    );
    expect(activeAfterAp).toHaveTextContent('Apple');
    // Refine further in the same typed sequence: "apr" → Apricot is unique.
    await user.keyboard('r');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apricot');
  });

  it('announces the active option via aria-activedescendant', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    const activeId = combobox.getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    const activeElement = document.getElementById(activeId as string);
    expect(activeElement).toHaveTextContent('Banana');
  });

  it('wires aria-controls to the listbox', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    const listbox = screen.getByRole('listbox');
    expect(combobox.getAttribute('aria-controls')).toBe(listbox.id);
  });

  it('skips disabled options during keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Select options={OPEN_OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');
    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    const activeId = combobox.getAttribute('aria-activedescendant');
    // Pineapple (index 1) is disabled and filtered from navigation entirely.
    expect(document.getElementById(activeId as string)).toHaveTextContent('Banana');
  });

  it('does not let Enter select the disabled option', async () => {
    const user = userEvent.setup();
    render(<Select options={OPEN_OPTIONS} label="Fruit" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
  });

  it('is disabled when disabled is true', () => {
    render(<Select options={OPTIONS} label="Fruit" disabled />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select options={OPTIONS} label="Fruit" disabled />);
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Select options={OPTIONS} label="Fruit" helperText="Pick a fruit" />);
    expect(screen.getByText('Pick a fruit')).toBeInTheDocument();
  });

  it('wires helper text via aria-describedby', () => {
    render(<Select options={OPTIONS} label="Fruit" helperText="Pick a fruit" />);
    const combobox = screen.getByRole('combobox', { name: 'Fruit' });
    const describedBy = combobox.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent('Pick a fruit');
  });

  it('renders an error message', () => {
    render(<Select options={OPTIONS} label="Fruit" error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('sets aria-invalid when an error is present', () => {
    render(<Select options={OPTIONS} label="Fruit" error="Required" />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('marks required with a visual asterisk', () => {
    render(<Select options={OPTIONS} label="Fruit" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders a clear button when clearable and a value is selected', () => {
    render(<Select options={OPTIONS} label="Fruit" defaultValue="apple" clearable />);
    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
  });

  it('clears the selection when the clear button is clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Select
        options={OPTIONS}
        label="Fruit"
        defaultValue="apple"
        clearable
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(onValueChange).toHaveBeenCalledWith('');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Select an option');
  });

  it('does not render a clear button without clearable', () => {
    render(<Select options={OPTIONS} label="Fruit" defaultValue="apple" />);
    expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument();
  });

  it('closes the listbox when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select options={OPTIONS} label="Fruit" />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Select options={OPTIONS} label="Fruit" className="my-select" />);
    expect(container.querySelector('div')).toHaveClass('my-select');
  });
});
