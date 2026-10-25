import { describe, it, expect, vi, afterEach } from 'vitest';
import { promiseAll } from './promise-all';

const delay = <T>(ms: number, value: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

const fail = (ms: number, message: string) =>
  new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), ms));

describe('promiseAll', () => {
  afterEach(() => vi.useRealTimers());

  it('resolves with all values', async () => {
    expect(await promiseAll([delay(10, 1), delay(10, 2)])).toEqual([1, 2]);
  });

  it('keeps input order even when promises finish out of order', async () => {
    const result = await promiseAll([delay(30, 'a'), delay(10, 'b'), delay(20, 'c')]);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('accepts plain values mixed with promises', async () => {
    expect(await promiseAll([1, delay(10, 2), 3])).toEqual([1, 2, 3]);
  });

  it('resolves an empty array straight away', async () => {
    expect(await promiseAll([])).toEqual([]);
  });

  it('rejects with the first error', async () => {
    await expect(promiseAll([delay(10, 1), fail(20, 'boom')])).rejects.toThrow('boom');
  });

  it('rejects without waiting for slower promises', async () => {
    vi.useFakeTimers();
    const result = promiseAll([delay(1000, 'slow'), fail(10, 'boom')]);
    const assertion = expect(result).rejects.toThrow('boom'); // attach before time moves
    await vi.advanceTimersByTimeAsync(10);
    await assertion;
  });

  it('matches the native Promise.all', async () => {
    const make = () => [delay(20, 'x'), 5, delay(5, 'y')];
    expect(await promiseAll(make())).toEqual(await Promise.all(make()));
  });
});