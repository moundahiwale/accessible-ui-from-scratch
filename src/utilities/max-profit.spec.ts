import { describe, it, expect } from 'vitest';
import { maxProfit } from './max-profit';

describe('maxProfit', () => {
  it.each([
    { name: 'basic example', prices: [7, 1, 5, 3, 6, 4], expected: 5 },
    { name: 'prices only fall: no profit', prices: [7, 6, 4, 3, 1], expected: 0 },
    { name: 'flat prices: no profit', prices: [2, 2, 2], expected: 0 },
    { name: 'two days rising', prices: [1, 2], expected: 1 },
    { name: 'best buy is not the lowest price', prices: [3, 8, 1, 4], expected: 5 },
    { name: 'lowest price is on the last day', prices: [5, 6, 1], expected: 1 },
    { name: 'a later lower buy wins', prices: [2, 4, 1, 7], expected: 6 },
    { name: 'single day', prices: [5], expected: 0 },
    { name: 'no prices', prices: [], expected: 0 },
  ])('$name', ({ prices, expected }) => {
    expect(maxProfit(prices)).toBe(expected);
  });
});