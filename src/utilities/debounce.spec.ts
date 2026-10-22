import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not call fn before the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    vi.advanceTimersByTime(999);

    expect(fn).not.toHaveBeenCalled();
  });

  it('calls fn once after the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    vi.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls fn once with the latest args after rapid calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced('s', 1);
    debounced('se', 2);
    debounced('search', 6);
    vi.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('search', 6);
  });

  it('restarts the timer on each call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    vi.advanceTimersByTime(600);
    debounced();
    vi.advanceTimersByTime(600);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels a pending call and still works afterwards', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(1000);

    expect(fn).not.toHaveBeenCalled();

    debounced();
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
