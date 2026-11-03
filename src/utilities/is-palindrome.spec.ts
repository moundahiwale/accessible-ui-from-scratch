import { describe, it, expect } from 'vitest';
import { isPalindrome } from './is-palindrome';

describe('isPalindrome, step 1: clean lowercase words', () => {
  it.each([
    { name: 'odd length', s: 'racecar', expected: true },
    { name: 'even length', s: 'abba', expected: true },
    { name: 'not a palindrome', s: 'abca', expected: false },
    { name: 'differs only in the middle pair', s: 'abcdba', expected: false },
    { name: 'single letter', s: 'a', expected: true },
    { name: 'empty string', s: '', expected: true },
  ])('$name', ({ s, expected }) => {
    expect(isPalindrome(s)).toBe(expected);
  });
});

describe('isPalindrome, full problem (LeetCode 125)', () => {
  it.each([
    { name: 'sentence with punctuation', s: 'A man, a plan, a canal: Panama', expected: true },
    { name: 'not a palindrome', s: 'race a car', expected: false },
    { name: 'only a space', s: ' ', expected: true },
    { name: 'only punctuation', s: '.,,', expected: true },
    { name: 'mixed case', s: 'Aba', expected: true },
    { name: 'digits count (trap)', s: '0P', expected: false },
    { name: 'apostrophes and spaces', s: "No 'x' in Nixon", expected: true },
  ])('$name', ({ s, expected }) => {
    expect(isPalindrome(s)).toBe(expected);
  });
});