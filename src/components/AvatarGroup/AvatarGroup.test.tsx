import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AvatarGroup } from './AvatarGroup';

const ITEMS = [
  { initials: 'AL', label: 'Ada Lovelace' },
  { initials: 'RF', label: 'Rosalind Franklin' },
  { initials: 'MT', label: 'Marie Tharp' },
  { initials: 'KH', label: 'Katherine Johnson' },
  { initials: 'GC', label: 'Grace Hopper' },
  { initials: 'DC', label: 'Dorothy Crowfoot Hodgkin' },
  { initials: 'BG', label: 'Barbara McClintock' },
];

describe('AvatarGroup', () => {
  it('renders a labeled group', () => {
    render(<AvatarGroup items={ITEMS} label="Engineering team" />);
    expect(screen.getByRole('group', { name: 'Engineering team' })).toBeInTheDocument();
  });

  it('defaults the label to "Team"', () => {
    render(<AvatarGroup items={ITEMS} />);
    expect(screen.getByRole('group', { name: 'Team' })).toBeInTheDocument();
  });

  it('renders every avatar when under the max', () => {
    render(<AvatarGroup items={ITEMS.slice(0, 3)} />);
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('collapses beyond max into an overflow chip', () => {
    const { container } = render(<AvatarGroup items={ITEMS} max={3} />);
    // 3 avatars + the +4 chip (the chip is aria-hidden).
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(container).toHaveTextContent('+4');
  });

  it('applies the max without overflow when items match exactly', () => {
    render(<AvatarGroup items={ITEMS.slice(0, 5)} max={5} />);
    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(document.body).not.toHaveTextContent('+');
  });

  it('hides the overflow chip from the accessibility tree', () => {
    const { container } = render(<AvatarGroup items={ITEMS} max={1} />);
    // The chip is any span whose text starts with "+".
    const chip = Array.from(container.querySelectorAll('span[aria-hidden="true"]')).find((el) =>
      el.textContent?.startsWith('+'),
    );
    expect(chip).toHaveTextContent('+6');
  });

  it('applies overlap spacing to avatars after the first', () => {
    const { container } = render(<AvatarGroup items={ITEMS.slice(0, 3)} spacing="lg" />);
    const avatars = container.querySelectorAll('[role="img"]');
    expect(avatars[1]).toHaveClass('-ml-3.5');
    expect(avatars[2]).toHaveClass('-ml-3.5');
    expect(avatars[0]).not.toHaveClass('-ml-3.5');
  });

  it('applies the default overlap spacing', () => {
    const { container } = render(<AvatarGroup items={ITEMS.slice(0, 2)} />);
    expect(container.querySelectorAll('[role="img"]')[1]).toHaveClass('-ml-2.5');
  });

  it('applies size to every avatar', () => {
    const { container } = render(<AvatarGroup items={ITEMS.slice(0, 2)} size="lg" />);
    container.querySelectorAll('[role="img"]').forEach((el) => {
      expect(el).toHaveClass('h-12 w-12');
    });
  });

  it('applies shape to every avatar', () => {
    const { container } = render(<AvatarGroup items={ITEMS.slice(0, 2)} shape="rounded" />);
    container.querySelectorAll('[role="img"]').forEach((el) => {
      expect(el).toHaveClass('rounded-lg');
    });
  });

  it('shows tooltips when showTooltip is enabled and a name exists', () => {
    render(
      <AvatarGroup
        items={[{ initials: 'AL', label: 'Ada Lovelace', name: 'Ada Lovelace' }]}
        showTooltip
      />,
    );
    fireEvent.focus(screen.getByRole('img'));
    expect(document.querySelector('[role="tooltip"]')).toHaveTextContent('Ada Lovelace');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AvatarGroup items={ITEMS.slice(0, 1)} className="my-avatar-group" />,
    );
    expect(container.firstChild).toHaveClass('my-avatar-group');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<AvatarGroup ref={ref} items={ITEMS.slice(0, 1)} />);
    expect(ref).toHaveBeenCalled();
  });
});
