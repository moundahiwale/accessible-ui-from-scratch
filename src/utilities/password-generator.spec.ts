import { describe, it, expect } from 'vitest';
import { shuffle, generatePassword } from './password-generator';

const sorted = (s: string) => [...s].sort().join('');
const count = (s: string, pattern: RegExp) => [...s].filter((c) => pattern.test(c)).length;

describe('shuffle', () => {
  it.each([
    { name: 'empty string', input: '' },
    { name: 'single character', input: 'a' },
  ])('$name: returned unchanged', ({ input }) => {
    expect(shuffle(input)).toBe(input);
  });

  it('keeps exactly the same characters (no duplicates, none lost)', () => {
    for (let run = 0; run < 100; run++) {
      expect(sorted(shuffle('AAbc12!@'))).toBe(sorted('AAbc12!@'));
    }
  });

  it('every ordering is possible, roughly equally often', () => {
    const seen = new Map<string, number>();
    const runs = 60000;
    for (let run = 0; run < runs; run++) {
      const result = shuffle('abc');
      seen.set(result, (seen.get(result) ?? 0) + 1);
    }
    expect(seen.size).toBe(6);
    for (const times of seen.values()) {
      expect(times).toBeGreaterThan(runs / 6 * 0.95);
      expect(times).toBeLessThan(runs / 6 * 1.05);
    }
  });
});

describe('generatePassword', () => {
  const UPPER = /[A-Z]/;
  const LOWER = /[a-z]/;
  const DIGIT = /[0-9]/;
  const SYMBOL = /[!@#$%^&*]/;

  it('default: 2 of each type, 8 characters', () => {
    for (let run = 0; run < 50; run++) {
      const password = generatePassword();
      expect(password).toHaveLength(8);
      expect(count(password, UPPER)).toBe(2);
      expect(count(password, LOWER)).toBe(2);
      expect(count(password, DIGIT)).toBe(2);
      expect(count(password, SYMBOL)).toBe(2);
    }
  });

  it('custom counts, including zero', () => {
    const password = generatePassword({ upper: 3, lower: 0, digits: 1, symbols: 4 });
    expect(password).toHaveLength(8);
    expect(count(password, UPPER)).toBe(3);
    expect(count(password, LOWER)).toBe(0);
    expect(count(password, DIGIT)).toBe(1);
    expect(count(password, SYMBOL)).toBe(4);
  });

  it('all counts zero: empty password', () => {
    expect(generatePassword({ upper: 0, lower: 0, digits: 0, symbols: 0 })).toBe('');
  });

  it('only uses allowed characters', () => {
    for (let run = 0; run < 50; run++) {
      expect(generatePassword()).toMatch(/^[A-Za-z0-9!@#$%^&*]+$/);
    }
  });

  it('is shuffled: types are not always grouped as upper, lower, digits, symbols', () => {
    const grouped = /^[A-Z]{2}[a-z]{2}[0-9]{2}[!@#$%^&*]{2}$/;
    const results = Array.from({ length: 100 }, () => generatePassword());
    expect(results.some((p) => !grouped.test(p))).toBe(true);
  });
});