import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders a title', () => {
    render(<Alert title="Heads up">Details</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it.each([
    ['info', 'status'],
    ['success', 'status'],
    ['neutral', 'status'],
    ['warning', 'alert'],
    ['danger', 'alert'],
  ] as const)('uses role=%s for the %s variant', (variant, expectedRole) => {
    render(<Alert variant={variant}>Message</Alert>);
    expect(screen.getByRole(expectedRole)).toBeInTheDocument();
  });

  it.each(['info', 'success', 'warning', 'danger', 'neutral'] as const)(
    'applies the %s variant container classes',
    (variant) => {
      const { container } = render(<Alert variant={variant}>Message</Alert>);
      const prefix = {
        info: 'sky',
        success: 'green',
        warning: 'amber',
        danger: 'red',
        neutral: 'slate',
      }[variant];
      expect(container.firstElementChild).toHaveClass(`border-${prefix}-200`);
    },
  );

  it('renders a custom icon', () => {
    render(<Alert icon={<svg data-testid="custom-icon" viewBox="0 0 24 24" />}>Message</Alert>);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders a default icon', () => {
    const { container } = render(<Alert>Message</Alert>);
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders a dismiss button when dismissible', () => {
    render(
      <Alert dismissible onDismiss={() => undefined}>
        Message
      </Alert>,
    );
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
  });

  it('does not render a dismiss button by default', () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
  });

  it('calls onDismiss when the dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Message
      </Alert>,
    );
    await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Alert className="my-alert">Message</Alert>);
    expect(container.firstElementChild).toHaveClass('my-alert');
  });
});
