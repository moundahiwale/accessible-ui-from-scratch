import { throttle } from './throttle';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires the first time it is called', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not fire again within cooling period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();
    vi.advanceTimersByTime(999);
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fires after cooling period is over', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled();
    vi.advanceTimersByTime(1000);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('passes args to fn', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled('a', 1);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a', 1);
  });
});
