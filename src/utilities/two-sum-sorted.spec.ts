import { describe, it, expect } from 'vitest';
import { twoSumSorted } from './two-sum-sorted';

describe('twoSumSorted', () => {
  it.each([
    { name: 'basic example', numbers: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { name: 'answer at both ends', numbers: [1, 3, 4, 10], target: 11, expected: [0, 3] },
    { name: 'answer in the middle', numbers: [1, 2, 3, 5, 9], target: 8, expected: [2, 3] },
    { name: 'negative numbers', numbers: [-3, -1, 0, 2, 4], target: 3, expected: [1, 4] },
    { name: 'duplicate values', numbers: [1, 3, 3, 8], target: 6, expected: [1, 2] },
    { name: 'two zeros', numbers: [0, 0], target: 0, expected: [0, 1] },
    { name: 'no pair adds up', numbers: [1, 2, 3], target: 10, expected: [] },
    { name: 'cannot use the same element twice', numbers: [5], target: 10, expected: [] },
    { name: 'empty array', numbers: [], target: 1, expected: [] },
  ])('$name', ({ numbers, target, expected }) => {
    expect(twoSumSorted(numbers, target)).toEqual(expected);
  });
});