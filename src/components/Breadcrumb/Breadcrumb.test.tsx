import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Components' },
];

describe('Breadcrumb', () => {
  it('renders all items', () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  it('renders a nav landmark with the default label', () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('uses a custom aria-label', () => {
    render(<Breadcrumb items={ITEMS} label="Page trail" />);
    expect(screen.getByRole('navigation', { name: 'Page trail' })).toBeInTheDocument();
  });

  it('renders items in an ordered list', () => {
    const { container } = render(<Breadcrumb items={ITEMS} />);
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(3);
  });

  it('links non-current items to their href', () => {
    render(<Breadcrumb items={ITEMS} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  });

  it('marks the last item as the current page', () => {
    render(<Breadcrumb items={ITEMS} />);
    const current = screen.getByText('Components');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('renders the current item as non-link text', () => {
    const { container } = render(<Breadcrumb items={ITEMS} />);
    expect(container.querySelector('span[aria-current="page"]')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Components' })).not.toBeInTheDocument();
  });

  it('respects an explicit current flag on a non-last item', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Settings', current: true },
          { label: 'Profile' },
        ]}
      />,
    );
    expect(screen.getByText('Settings')).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between items', () => {
    const { container } = render(<Breadcrumb items={ITEMS} />);
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
  });

  it('renders exactly one separator between three items', () => {
    const { container } = render(<Breadcrumb items={ITEMS} />);
    const items = container.querySelectorAll('li');
    items.forEach((item, index) => {
      const hasSeparator = item.querySelector('svg') !== null;
      expect(hasSeparator).toBe(index > 0);
    });
  });

  it('applies custom className', () => {
    const { container } = render(<Breadcrumb items={ITEMS} className="my-crumb" />);
    expect(container.querySelector('nav')).toHaveClass('my-crumb');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Breadcrumb items={ITEMS} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
