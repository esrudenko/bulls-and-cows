import { describe, expect, it } from 'vitest';
import { evaluateGuess } from './evaluateGuess';

describe('evaluateGuess', () => {
  it('counts bulls and cows correctly', () => {
    const result = evaluateGuess('1234', '1532');
    expect(result).toEqual({ bulls: 2, cows: 1 });
  });
  it('counts all bulls when the guess matches the secret', () => {
    const result = evaluateGuess('1234', '1234');
    expect(result).toEqual({ bulls: 4, cows: 0 });
  });
  it('counts all cows when digits are in wrong positions', () => {
    const result = evaluateGuess('1234', '4312');
    expect(result).toEqual({ bulls: 0, cows: 4 });
  });
  it('returns zero bulls and cows when there are no matching digits', () => {
    const result = evaluateGuess('3421', '5786');
    expect(result).toEqual({ bulls: 0, cows: 0 });
  });
  it('counts bulls and cows case-insensitively', () => {
    const result = evaluateGuess('AB12', 'a1b3');
    expect(result).toEqual({ bulls: 1, cows: 2 });
  });
  it('handles leading zeros correctly', () => {
    const result = evaluateGuess('0C31', '034a');
    expect(result).toEqual({ bulls: 1, cows: 1 });
  });
});
