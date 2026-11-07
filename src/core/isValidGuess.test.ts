import { describe, expect, it } from 'vitest';
import { isValidGuess } from './isValidGuess';

describe('isValidGuess', () => {
  it('accepts a valid decimal guess', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });
  it('rejects guesses with incorrect length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
    expect(isValidGuess('', 4, 10)).toBe(false);
  });
  it('rejects guesses with duplicate digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('1213', 4, 10)).toBe(false);
    expect(isValidGuess('1111', 4, 10)).toBe(false);
  });
  it('validates digits according to the numeral system', () => {
    expect(isValidGuess('1289', 4, 8)).toBe(false);
    expect(isValidGuess('12A4', 4, 10)).toBe(false);
    expect(isValidGuess('12G4', 4, 16)).toBe(false);
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('02', 2, 2)).toBe(false);
  });
  it('validates hexadecimal guesses case-insensitively', () => {
    expect(isValidGuess('aF02', 4, 16)).toBe(true);
    expect(isValidGuess('AF02', 4, 16)).toBe(true);
    expect(isValidGuess('aA12', 4, 16)).toBe(false);
    expect(isValidGuess('fF01', 4, 16)).toBe(false);
  });
  it('accepts guesses with leading zeros', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
    expect(isValidGuess('012345', 6, 10)).toBe(true);
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('0aF', 3, 16)).toBe(true);
  });
  it('accepts guesses with minimum and maximum length', () => {
    expect(isValidGuess('12', 2, 10)).toBe(true);
    expect(isValidGuess('123456', 6, 10)).toBe(true);
  });
});
