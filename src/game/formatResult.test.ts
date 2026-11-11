import { describe, expect, it } from 'vitest';
import { formatResult } from './formatResult';

describe('formatResult', () => {
  it('uses singular words for one bull and one cow', () => {
    expect(formatResult(1, 1)).toBe('1 bull, 1 cow');
  });
  it('uses plural words for zero', () => {
    expect(formatResult(0, 0)).toBe('0 bulls, 0 cows');
  });
  it('uses plural words for more than one', () => {
    expect(formatResult(2, 3)).toBe('2 bulls, 3 cows');
  });
  it('chooses singular and plural independently', () => {
    expect(formatResult(1, 2)).toBe('1 bull, 2 cows');
    expect(formatResult(4, 1)).toBe('4 bulls, 1 cow');
  });
});
