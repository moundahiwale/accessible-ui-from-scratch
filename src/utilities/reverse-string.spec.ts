import { describe, it, expect } from 'vitest';
import { reverseString } from './reverse-string';

describe('reverseString', () => {
  it.each([
    { name: 'even length', chars: ['h', 'e', 'l', 'l', 'o', '!'], expected: ['!', 'o', 'l', 'l', 'e', 'h'] },
    { name: 'odd length', chars: ['h', 'e', 'l', 'l', 'o'], expected: ['o', 'l', 'l', 'e', 'h'] },
    { name: 'two characters', chars: ['a', 'b'], expected: ['b', 'a'] },
    { name: 'single character', chars: ['a'], expected: ['a'] },
    { name: 'empty array', chars: [], expected: [] },
    { name: 'palindrome stays the same', chars: ['r', 'a', 'c', 'e', 'c', 'a', 'r'], expected: ['r', 'a', 'c', 'e', 'c', 'a', 'r'] },
    { name: 'spaces and punctuation are reversed too', chars: ['a', ' ', 'b', ','], expected: [',', 'b', ' ', 'a'] },
  ])('$name', ({ chars, expected }) => {
    reverseString(chars);
    expect(chars).toEqual(expected);
  });

  it('modifies the same array and returns nothing', () => {
    const chars = ['a', 'b', 'c'];
    const original = chars;
    const result = reverseString(chars);
    expect(result).toBeUndefined();
    expect(chars).toBe(original);
    expect(chars).toEqual(['c', 'b', 'a']);
  });
});