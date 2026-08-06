import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the trigger', () => {
    render(
      <Tooltip content="Copied!">
        <button>Copy</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
  });

  it('does not render the tooltip initially', () => {
    render(
      <Tooltip content="Copied!">
        <button>Copy</button>
      </Tooltip>,
    );
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('shows the tooltip on focus (keyboard)', () => {
    render(
      <Tooltip content="More info">
        <button>Info</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Info' }));
    expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
  });

  it('hides the tooltip on blur', () => {
    render(
      <Tooltip content="More info">
        <button>Info</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Info' });
    fireEvent.focus(button);
    expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
    fireEvent.blur(button);
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('shows the tooltip on hover after the delay', () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Copied!" delay={200}>
        <button>Copy</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Copy' }));
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
  });

  it('does not show the tooltip before the delay elapses', () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="Copied!" delay={500}>
        <button>Copy</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Copy' }));
    vi.advanceTimersByTime(200);
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('hides the tooltip on mouse leave', () => {
    vi.useFakeTimers();
    render(
      <Tooltip content="More info">
        <button>Info</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Info' });
    fireEvent.mouseEnter(button);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
    fireEvent.mouseLeave(button);
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('renders the tooltip content', () => {
    render(
      <Tooltip content="Delete forever">
        <button>Delete</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Delete' }));
    expect(document.querySelector('[role="tooltip"]')).toHaveTextContent('Delete forever');
  });

  it('wires aria-describedby on the trigger when visible', () => {
    render(
      <Tooltip content="More info">
        <button>Info</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button', { name: 'Info' });
    fireEvent.focus(button);
    const describedBy = button.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toBeInTheDocument();
  });

  it('does not set aria-describedby while hidden', () => {
    render(
      <Tooltip content="More info">
        <button>Info</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Info' })).not.toHaveAttribute('aria-describedby');
  });

  it('does not open when disabled', () => {
    render(
      <Tooltip content="More info" disabled>
        <button>Info</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Info' }));
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('applies placement classes for the arrow positioning', () => {
    render(
      <Tooltip content="Top tip" placement="top">
        <button>Info</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Info' }));
    const tooltipEl = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltipEl).toBeInTheDocument();
    expect(tooltipEl.querySelector('span')).toHaveClass('bottom-[-4px]');
  });

  it('omits the arrow when arrow=false', () => {
    render(
      <Tooltip content="No arrow" arrow={false}>
        <button>Info</button>
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Info' }));
    const tooltipEl = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltipEl?.querySelectorAll('span')).toHaveLength(0);
  });
});
