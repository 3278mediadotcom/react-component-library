import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <div>One</div>
        <div>Two</div>
      </Stack>,
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('defaults to a column direction', () => {
    const { container } = render(<Stack>Content</Stack>);
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('applies row direction', () => {
    const { container } = render(<Stack direction="row">Content</Stack>);
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it.each([
    ['xs', 'gap-1'],
    ['sm', 'gap-2'],
    ['md', 'gap-4'],
    ['lg', 'gap-6'],
    ['xl', 'gap-8'],
    ['2xl', 'gap-12'],
  ] as const)('applies the %s spacing gap', (spacing, expectedClass) => {
    const { container } = render(<Stack spacing={spacing}>Content</Stack>);
    expect(container.firstChild).toHaveClass(expectedClass);
  });

  it('applies a "none" spacing gap', () => {
    const { container } = render(<Stack spacing="none">Content</Stack>);
    expect(container.firstChild).toHaveClass('gap-0');
  });

  it('applies align classes', () => {
    const { container } = render(<Stack align="center">Content</Stack>);
    expect(container.firstChild).toHaveClass('items-center');
  });

  it('applies justify classes', () => {
    const { container } = render(<Stack justify="between">Content</Stack>);
    expect(container.firstChild).toHaveClass('justify-between');
  });

  it('wraps children when wrap is true', () => {
    const { container } = render(<Stack wrap>Content</Stack>);
    expect(container.firstChild).toHaveClass('flex-wrap');
  });

  it('applies custom className', () => {
    const { container } = render(<Stack className="my-stack">Content</Stack>);
    expect(container.firstChild).toHaveClass('my-stack');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Stack ref={ref}>Content</Stack>);
    expect(ref).toHaveBeenCalled();
  });
});
