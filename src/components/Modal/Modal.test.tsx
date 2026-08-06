import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

function Controller({ initialOpen = false }: { initialOpen?: boolean }) {
  const [openState, setOpenState] = useState(initialOpen);
  return (
    <div>
      <button onClick={() => setOpenState(true)}>Open dialog</button>
      <Modal
        open={openState}
        onClose={() => setOpenState(false)}
        title="Settings"
        description="Manage your preferences."
      >
        <p>Modal body</p>
        <button>Save</button>
      </Modal>
    </div>
  );
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal>Body</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a dialog when open', () => {
    render(<Modal defaultOpen>Body</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Modal defaultOpen>Body content</Modal>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('sets aria-modal="true"', () => {
    render(<Modal defaultOpen>Body</Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('wires the title via aria-labelledby', () => {
    render(
      <Modal defaultOpen title="Settings">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId as string)).toHaveTextContent('Settings');
  });

  it('wires the description via aria-describedby', () => {
    render(
      <Modal defaultOpen title="Settings" description="Preferences">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    const descId = dialog.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    expect(document.getElementById(descId as string)).toHaveTextContent('Preferences');
  });

  it('renders the close button', () => {
    render(
      <Modal defaultOpen title="Settings">
        Body
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('hides the close button when showCloseButton is false', () => {
    render(
      <Modal defaultOpen showCloseButton={false}>
        Body
      </Modal>,
    );
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal defaultOpen onClose={onClose}>
        Body
      </Modal>,
    );
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes with Escape', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close with Escape when closeOnEscape is false', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Modal defaultOpen closeOnEscape={false}>
          Body
        </Modal>
      </div>,
    );
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal defaultOpen onClose={onClose}>
        Body
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    // Click outside the dialog panel (on the backdrop).
    await user.click(document.querySelector('[aria-hidden="true"]') as HTMLElement);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close when the dialog panel is clicked', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    await user.click(screen.getByRole('dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not close on backdrop when closeOnBackdrop is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal defaultOpen closeOnBackdrop={false} onClose={onClose}>
        Body
      </Modal>,
    );
    await user.click(document.querySelector('[aria-hidden="true"]') as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders through a portal into the document body', () => {
    const { baseElement } = render(<Modal defaultOpen>Body</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(baseElement.contains(dialog)).toBe(true);
    expect(dialog.closest('div[data-modal-container]')).toBeNull();
  });

  it('moves focus into the dialog when it opens', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    // Focus lands on the first focusable element in the dialog (close button).
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();
  });

  it('restores focus to the trigger button on close', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(trigger).toHaveFocus();
  });

  it('traps Tab focus within the dialog', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Modal defaultOpen showCloseButton={false}>
          <button>First</button>
          <button>Second</button>
        </Modal>
        <button>Outside</button>
      </div>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    // Focus is moved to the first focusable on open.
    expect(first).toHaveFocus();
    await user.tab();
    expect(second).toHaveFocus();
    // Tab from the last element wraps back to the first (trap).
    await user.tab();
    expect(first).toHaveFocus();
  });

  it('locks body scroll while open', () => {
    render(<Modal defaultOpen>Body</Modal>);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(document.body.style.overflow).toBe('');
  });

  it('supports uncontrolled usage with defaultOpen', () => {
    render(<Modal defaultOpen>Body</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('respects size classes', () => {
    render(
      <Modal defaultOpen size="lg">
        Body
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-2xl');
  });

  it('applies custom className', () => {
    render(
      <Modal defaultOpen className="my-overlay">
        Body
      </Modal>,
    );
    expect(screen.getByRole('dialog').parentElement).toHaveClass('my-overlay');
  });

  it('navigates focus backward with Shift+Tab and wraps', async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <button>First</button>
        <button>Second</button>
      </Modal>,
    );
    // Focus closes the dialog on open → Shift+Tab should wrap to last.
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
  });

  it('renders a long-form scrollable body without errors', () => {
    render(
      <Modal defaultOpen title="Long form">
        <div data-testid="long-body">
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>Line {i}</p>
          ))}
        </div>
      </Modal>,
    );
    expect(screen.getByTestId('long-body')).toBeInTheDocument();
  });

  it('is keyboard-focusable inside the dialog', async () => {
    const user = userEvent.setup();
    render(
      <Modal defaultOpen>
        <a href="#a">Link A</a>
        <button>Button B</button>
      </Modal>,
    );
    await user.tab();
    expect(screen.getByRole('link', { name: 'Link A' })).toHaveFocus();
  });
});
