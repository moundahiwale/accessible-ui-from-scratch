import { describe, it, expect } from 'vitest';
import { maxWindowSum } from './max-window-sum';

describe('maxWindowSum', () => {
  it.each([
    { name: 'basic example', nums: [2, 1, 5, 1, 3, 2], k: 3, expected: 9 },
    { name: 'window of 1 is the largest element', nums: [4, 2, 7], k: 1, expected: 7 },
    { name: 'window covers the whole array', nums: [1, 2, 3], k: 3, expected: 6 },
    { name: 'best window at the start', nums: [9, 1, 1, 1], k: 2, expected: 10 },
    { name: 'best window at the end', nums: [1, 1, 1, 9], k: 2, expected: 10 },
    { name: 'all negative numbers', nums: [-1, -2, -3, -4], k: 2, expected: -3 },
    { name: 'mixed positive and negative', nums: [3, -1, 4, -1, 5], k: 2, expected: 4 },
    { name: 'k larger than the array', nums: [1, 2], k: 3, expected: null },
    { name: 'k of zero', nums: [1, 2, 3], k: 0, expected: null },
    { name: 'empty array', nums: [], k: 1, expected: null },
  ])('$name', ({ nums, k, expected }) => {
    expect(maxWindowSum(nums, k)).toBe(expected);
  });
});