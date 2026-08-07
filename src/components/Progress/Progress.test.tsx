import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders a progressbar role', () => {
    render(<Progress label="Uploading" value={50} />);
    expect(screen.getByRole('progressbar', { name: 'Uploading' })).toBeInTheDocument();
  });

  it('exposes aria-valuenow', () => {
    render(<Progress value={65} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '65');
  });

  it('exposes aria-valuemin and aria-valuemax', () => {
    render(<Progress value={65} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('exposes aria-valuetext with a percentage', () => {
    render(<Progress value={30} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '30%');
  });

  it('clamps values above 100', () => {
    render(<Progress value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps values below 0', () => {
    render(<Progress value={-5} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('omits aria-valuenow when indeterminate', () => {
    render(<Progress indeterminate label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  it('does not render an inline fill width when indeterminate', () => {
    const { container } = render(<Progress indeterminate />);
    const fill = container.querySelector('.h-full') as HTMLElement;
    expect(fill.getAttribute('style')).toBeNull();
    expect(fill).toHaveClass('w-2/5');
  });

  it('sets an inline fill width for determinate values', () => {
    const { container } = render(<Progress value={62} />);
    const fill = container.querySelector('.h-full') as HTMLElement;
    expect(fill).toHaveStyle({ width: '62%' });
  });

  it('shows the percentage when showValue is set', () => {
    render(<Progress value={45} showValue />);
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('hides the percentage by default', () => {
    render(<Progress value={45} />);
    expect(screen.queryByText('45%')).not.toBeInTheDocument();
  });

  it('hides the percentage when indeterminate', () => {
    render(<Progress indeterminate showValue />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('applies color classes to the fill', () => {
    const { container } = render(<Progress value={45} color="success" />);
    expect(container.querySelector('.h-full')).toHaveClass('bg-green-600');
  });

  it('renders a circular variant', () => {
    const { container } = render(<Progress variant="circular" value={75} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a large circular variant with proper dimensions', () => {
    const { container } = render(<Progress variant="circular" size="lg" value={75} />);
    expect(container.querySelector('svg')).toHaveClass('h-[72px] w-[72px]');
  });

  it('applies custom className', () => {
    const { container } = render(<Progress value={10} className="my-progress" />);
    expect(container.firstChild).toHaveClass('my-progress');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Progress ref={ref} value={10} />);
    expect(ref).toHaveBeenCalled();
  });
});
