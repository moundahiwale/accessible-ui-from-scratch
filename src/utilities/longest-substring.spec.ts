import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from './longest-substring';

describe('lengthOfLongestSubstring', () => {
  it.each([
    ['', 0],
    ['a', 1],
    ['bbbbb', 1],
    ['abcabcbb', 3],
    ['pwwkew', 3],
    ['abcad', 4],
    ['abba', 2],
    ['dvdf', 3],
    ['tmmzuxt', 5],
    ['abcdef', 6],
    ['aA', 2],
    ['a b c', 3],
  ])('%j -> %i', (s, expected) => {
    expect(lengthOfLongestSubstring(s)).toBe(expected);
  });

  it('handles a long string quickly', () => {
    const s = 'abcdefghijklmnopqrstuvwxyz'.repeat(4000);
    expect(lengthOfLongestSubstring(s)).toBe(26);
  });
});