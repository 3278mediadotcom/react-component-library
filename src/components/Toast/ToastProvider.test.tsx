import { render, screen, act } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

function Trigger({
  variant = 'success',
  options,
}: {
  variant?: 'success' | 'error' | 'info' | 'warning';
  options?: Record<string, unknown>;
}) {
  const toast = useToast();
  return (
    <button onClick={() => toast[variant]({ content: `${variant} message`, ...options } as never)}>
      Show {variant}
    </button>
  );
}

function renderSystem(props: ComponentProps<typeof ToastProvider> = {}) {
  return render(
    <ToastProvider {...props}>
      <Trigger />
    </ToastProvider>,
  );
}

describe('ToastProvider', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a toast when a constructor is called', () => {
    renderSystem();
    act(() => {
      screen.getByRole('button', { name: 'Show success' }).click();
    });
    expect(screen.getByText('success message')).toBeInTheDocument();
  });

  it('renders a dismiss button on each toast', () => {
    renderSystem();
    act(() => {
      screen.getByRole('button', { name: 'Show success' }).click();
    });
    expect(screen.getAllByRole('button', { name: 'Dismiss notification' })).toHaveLength(1);
  });

  it('dismisses a toast via its dismiss button', () => {
    vi.useFakeTimers();
    renderSystem({ duration: 0 }); // persistent → only manual dismiss
    act(() => {
      screen.getByRole('button', { name: 'Show success' }).click();
    });
    expect(screen.getByText('success message')).toBeInTheDocument();
    act(() => {
      screen.getAllByRole('button', { name: 'Dismiss notification' })[0].click();
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText('success message')).not.toBeInTheDocument();
  });

  it('auto-dismisses after the default duration', () => {
    vi.useFakeTimers();
    renderSystem({ duration: 1000 });
    act(() => {
      screen.getByRole('button', { name: 'Show success' }).click();
    });
    expect(screen.getByText('success message')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      vi.advanceTimersByTime(300); // exit animation
    });
    expect(screen.queryByText('success message')).not.toBeInTheDocument();
  });

  it('keeps a persistent toast (duration 0) on screen', () => {
    vi.useFakeTimers();
    renderSystem({ duration: 0 });
    act(() => {
      screen.getByRole('button', { name: 'Show success' }).click();
    });
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText('success message')).toBeInTheDocument();
  });

  it.each(['success', 'error', 'info', 'warning'] as const)('renders the %s variant', (variant) => {
    render(
      <ToastProvider>
        <Trigger variant={variant} />
      </ToastProvider>,
    );
    act(() => {
      screen.getByRole('button', { name: `Show ${variant}` }).click();
    });
    expect(screen.getByText(`${variant} message`)).toBeInTheDocument();
  });

  it('caps the visible toasts at maxVisible', () => {
    render(
      <ToastProvider maxVisible={2}>
        <Trigger options={{ duration: 0, content: 'persistent' }} />
      </ToastProvider>,
    );
    act(() => {
      screen.getByRole('button', { name: 'Show success' }).click();
      screen.getByRole('button', { name: 'Show success' }).click();
      screen.getByRole('button', { name: 'Show success' }).click();
    });
    expect(screen.getAllByText('persistent')).toHaveLength(2);
  });

  it('renders a polite live region', () => {
    renderSystem();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
