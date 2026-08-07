import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Grid>
        <div>Cell</div>
      </Grid>,
    );
    expect(getByText('Cell')).toBeInTheDocument();
  });

  it('applies the grid display class', () => {
    const { container } = render(<Grid>Content</Grid>);
    expect(container.firstChild).toHaveClass('grid');
  });

  it('sets the default grid-cols variable to 1', () => {
    const { container } = render(<Grid>Content</Grid>);
    expect(container.firstChild).toHaveStyle({ '--grid-cols': '1' });
  });

  it('sets the grid-cols variable for a numeric count', () => {
    const { container } = render(<Grid columns={4}>Content</Grid>);
    expect(container.firstChild).toHaveStyle({ '--grid-cols': '4' });
  });

  it('uses an inline template for string columns', () => {
    const { container } = render(<Grid columns="200px 1fr">Content</Grid>);
    expect(container.firstChild).toHaveStyle({ 'grid-template-columns': '200px 1fr' });
  });

  it('uses an inline template for columns above 12', () => {
    const { container } = render(<Grid columns={16}>Content</Grid>);
    expect(container.firstChild).toHaveStyle({
      'grid-template-columns': 'repeat(16, minmax(0, 1fr))',
    });
  });

  it('sets breakpoint variables when provided', () => {
    const { container } = render(
      <Grid columns={1} breakpoints={{ sm: 2, lg: 4 }}>
        Content
      </Grid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--grid-cols-sm')).toBe('2');
    expect(el.style.getPropertyValue('--grid-cols-lg')).toBe('4');
  });

  it('uses auto-fit template when autoFit is true', () => {
    const { container } = render(
      <Grid autoFit minColumnWidth="180px">
        Content
      </Grid>,
    );
    expect(container.firstChild).toHaveStyle({
      'grid-template-columns': 'repeat(auto-fit, minmax(180px, 1fr))',
    });
  });

  it('uses auto-fill template when autoFill is true', () => {
    const { container } = render(
      <Grid autoFill minColumnWidth="150px">
        Content
      </Grid>,
    );
    expect(container.firstChild).toHaveStyle({
      'grid-template-columns': 'repeat(auto-fill, minmax(150px, 1fr))',
    });
  });

  it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'applies the %s gap class',
    (gap) => {
      const { container } = render(<Grid gap={gap}>Content</Grid>);
      const expected = {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
      }[gap];
      expect(container.firstChild).toHaveClass(expected);
    },
  );

  it('applies custom className', () => {
    const { container } = render(<Grid className="my-grid">Content</Grid>);
    expect(container.firstChild).toHaveClass('my-grid');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Grid ref={ref}>Content</Grid>);
    expect(ref).toHaveBeenCalled();
  });
});
