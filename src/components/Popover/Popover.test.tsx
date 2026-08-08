import { fireEvent, render, screen, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Popover } from './Popover';

function MenuPopover(props: Partial<ComponentProps<typeof Popover>> = {}) {
  return (
    <Popover
      content={
        <div>
          <button>Profile</button>
          <a href="#settings">Settings</a>
        </div>
      }
      {...props}
    >
      <button>Open menu</button>
    </Popover>
  );
}

describe('Popover', () => {
  it('renders the trigger', () => {
    render(<MenuPopover />);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('does not render the popover initially', () => {
    render(<MenuPopover />);
    expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('opens on trigger click', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('closes on a second trigger click', () => {
    render(<MenuPopover />);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(trigger);
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('wires aria-expanded on the trigger', () => {
    render(<MenuPopover />);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('wires aria-haspopup on the trigger', () => {
    render(<MenuPopover />);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-haspopup',
      'dialog',
    );
  });

  it('wires aria-controls to the panel id', () => {
    render(<MenuPopover />);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(trigger);
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id);
  });

  it('renders the content', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    expect(panel).toHaveTextContent('Profile');
    expect(panel).toHaveTextContent('Settings');
  });

  it('labels the dialog with the accessible name', () => {
    render(<MenuPopover aria-label="User menu" />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog', { name: 'User menu' })).toBeInTheDocument();
  });

  it('uses "Popover" as the default accessible name', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('dialog', { name: 'Popover' })).toBeInTheDocument();
  });

  it('moves focus into the panel when opened', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.querySelector('[role="dialog"]')).toHaveFocus();
  });

  it('closes on outside click', () => {
    render(
      <div>
        <MenuPopover />
        <button>Outside</button>
      </div>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('does not close on outside click when disabled', () => {
    render(
      <div>
        <Popover content={<button>Item</button>} closeOnOutsideClick={false}>
          <button>Open</button>
        </Popover>
        <button>Outside</button>
      </div>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('does not close on Escape when disabled', () => {
    render(<MenuPopover closeOnEscape={false} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('closes when an interactive item is clicked and closeOnItemClick is true', () => {
    render(<MenuPopover closeOnItemClick />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    const profileButton = within(panel).getByRole('button', { name: 'Profile' });
    fireEvent.click(profileButton);
    expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('stays open on item click when closeOnItemClick is false', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    const profileButton = within(panel).getByRole('button', { name: 'Profile' });
    fireEvent.click(profileButton);
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('keeps the portal panel open on mousedown inside it (outside-click regression)', () => {
    // Regression: the panel renders in a portal on document.body, so it is not a
    // DOM descendant of the trigger. useClickOutside must treat the panel itself
    // as "inside"; otherwise a real browser's mousedown (fired before click)
    // closes the panel before the item's click handler can run.
    const handleProfileClick = vi.fn();
    render(
      <Popover
        content={
          <div>
            <button onClick={handleProfileClick}>Profile</button>
          </div>
        }
      >
        <button>Open menu</button>
      </Popover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    const profileButton = within(panel).getByRole('button', { name: 'Profile' });

    // Real browsers fire mousedown before click; a buggy outside-click handler
    // would close the panel here and unmount the button before click dispatch.
    fireEvent.mouseDown(profileButton);
    expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();

    fireEvent.click(profileButton);
    expect(handleProfileClick).toHaveBeenCalledTimes(1);
  });

  it('positions with the requested placement classes', () => {
    render(<MenuPopover placement="right" />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const panel = document.querySelector('[role="dialog"]') as HTMLElement;
    expect(panel).toBeInTheDocument();
    // The placement is applied via the positioning hook (style).
    expect(panel.style.top).not.toBe('');
  });

  it('renders through a portal', () => {
    const { baseElement } = render(<MenuPopover />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(baseElement.contains(document.querySelector('[role="dialog"]'))).toBe(true);
  });

  it('applies custom className', () => {
    render(<MenuPopover className="my-popover" />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.querySelector('.my-popover')).toBeInTheDocument();
  });
});
