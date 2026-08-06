import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Drawer } from './Drawer';

function Controller() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open drawer</button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Cart">
        <p>Drawer body</p>
      </Drawer>
    </div>
  );
}

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer>Body</Drawer>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a dialog when open', () => {
    render(<Drawer defaultOpen>Body</Drawer>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Drawer defaultOpen>Body content</Drawer>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it.each(['left', 'right', 'top', 'bottom'] as const)(
    'applies the %s placement classes',
    (placement) => {
      render(
        <Drawer defaultOpen placement={placement}>
          Body
        </Drawer>,
      );
      const panel = document.querySelector('[role="dialog"]') as HTMLElement;
      const expected = {
        left: ['left-0', 'animate-drawer-in-left', 'inset-y-0'],
        right: ['right-0', 'animate-drawer-in-right', 'inset-y-0'],
        top: ['top-0', 'animate-drawer-in-top', 'inset-x-0'],
        bottom: ['bottom-0', 'animate-drawer-in-bottom', 'inset-x-0'],
      }[placement];
      expected.forEach((cls) => expect(panel).toHaveClass(cls));
    },
  );

  it('applies horizontal width for side placements', () => {
    render(
      <Drawer defaultOpen placement="left" width="w-96">
        Body
      </Drawer>,
    );
    expect(document.querySelector('[role="dialog"]')).toHaveClass('w-96');
  });

  it('applies vertical height for top/bottom placements', () => {
    render(
      <Drawer defaultOpen placement="top" height="h-48">
        Body
      </Drawer>,
    );
    expect(document.querySelector('[role="dialog"]')).toHaveClass('h-48');
  });

  it('wires the title via aria-labelledby', () => {
    render(
      <Drawer defaultOpen title="Cart">
        Body
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Cart' });
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('renders the close button', () => {
    render(
      <Drawer defaultOpen title="Cart">
        Body
      </Drawer>,
    );
    expect(screen.getByRole('button', { name: 'Close drawer' })).toBeInTheDocument();
  });

  it('closes via the close button', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    await user.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes via Escape', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close on Escape when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Drawer defaultOpen closeOnEscape={false}>
        Body
      </Drawer>,
    );
    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes via the backdrop', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    await user.click(document.querySelector('[aria-hidden="true"]') as HTMLElement);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close on backdrop when disabled', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer defaultOpen closeOnBackdrop={false} onClose={onClose}>
        Body
      </Drawer>,
    );
    await user.click(document.querySelector('[aria-hidden="true"]') as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when closed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer defaultOpen onClose={onClose}>
        Body
      </Drawer>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders through a portal', () => {
    const { baseElement } = render(<Drawer defaultOpen>Body</Drawer>);
    expect(baseElement.contains(screen.getByRole('dialog'))).toBe(true);
  });

  it('moves focus into the drawer on open', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveFocus();
  });

  it('restores focus to the trigger on close', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    const trigger = screen.getByRole('button', { name: 'Open drawer' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(trigger).toHaveFocus();
  });

  it('traps Tab focus within the drawer', async () => {
    const user = userEvent.setup();
    render(
      <Drawer defaultOpen showCloseButton={false}>
        <button>First</button>
        <button>Second</button>
      </Drawer>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    expect(first).toHaveFocus();
    await user.tab();
    expect(second).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
  });

  it('locks body scroll while open', () => {
    render(<Drawer defaultOpen>Body</Drawer>);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll on close', async () => {
    const user = userEvent.setup();
    render(<Controller />);
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(document.body.style.overflow).toBe('');
  });

  it('supports uncontrolled usage', () => {
    render(<Drawer defaultOpen>Body</Drawer>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Drawer defaultOpen className="my-overlay">
        Body
      </Drawer>,
    );
    expect(document.querySelector('.my-overlay')).toBeInTheDocument();
  });
});
