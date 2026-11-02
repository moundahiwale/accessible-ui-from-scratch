import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { retry } from './retry';

describe('retry with backoff', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns the value on the first try without waiting', async () => {
    const fn = vi.fn(() => Promise.resolve('ok'));
    await expect(retry(fn, 3, 100)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries after a failure and returns the later success', async () => {
    const fn = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('ok');

    const result = retry(fn, 3, 100);
    await vi.advanceTimersByTimeAsync(100 + 200);

    await expect(result).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('doubles the wait each time: 100ms, then 200ms, then 400ms', async () => {
    const fn = vi.fn<() => Promise<string>>().mockRejectedValue(new Error('down'));
    const result = retry(fn, 3, 100);
    const assertion = expect(result).rejects.toThrow('down'); // attach before time moves

    await vi.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(99);
    expect(fn).toHaveBeenCalledTimes(1); // still waiting
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(2); // after 100ms

    await vi.advanceTimersByTimeAsync(199);
    expect(fn).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(3); // after another 200ms

    await vi.advanceTimersByTimeAsync(400);
    expect(fn).toHaveBeenCalledTimes(4); // after another 400ms
    await assertion;
  });

  it('throws the last error once retries run out', async () => {
    const fn = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('first'))
      .mockRejectedValueOnce(new Error('second'))
      .mockRejectedValueOnce(new Error('last'));

    const result = retry(fn, 2, 100);
    const assertion = expect(result).rejects.toThrow('last');
    await vi.advanceTimersByTimeAsync(100 + 200);

    await assertion;
    expect(fn).toHaveBeenCalledTimes(3); // 1 try + 2 retries
  });

  it('does not wait after the final failure', async () => {
    const fn = vi.fn<() => Promise<string>>().mockRejectedValue(new Error('down'));
    const result = retry(fn, 1, 100);
    const assertion = expect(result).rejects.toThrow('down');

    await vi.advanceTimersByTimeAsync(100); // only one wait, then give up
    await assertion;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0); // no leftover sleep
  });

  it('with 0 retries, calls once and throws', async () => {
    const fn = vi.fn<() => Promise<string>>().mockRejectedValue(new Error('nope'));
    await expect(retry(fn, 0, 100)).rejects.toThrow('nope');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});