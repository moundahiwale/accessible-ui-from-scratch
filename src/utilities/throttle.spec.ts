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

  it('remembers args from the trailing call and runs the fn', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled('a', 1);
    expect(fn).toHaveBeenCalledTimes(1);

    throttled('aa', 11);
    throttled('aaa', 111);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenNthCalledWith(2, 'aaa', 111);
  });

  it('does not make trailing call when there were no calls during the cool down', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled('a', 1);
    vi.advanceTimersByTime(5000);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('starts a new cool-down after the trailing call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 1000);

    throttled('a', 1);
    throttled('b', 2);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenNthCalledWith(2, 'b', 2);

    throttled('c', 3);
    expect(fn).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenNthCalledWith(3, 'c', 3);
  })
});
