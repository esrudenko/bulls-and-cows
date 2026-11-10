import { describe, expect, it } from 'vitest';
import { appendDigit, removeLastDigit } from './guessInput';

describe('appendDigit', () => {
  it('adds a digit to an empty input', () => {
    expect(appendDigit('', '5', 4, 10)).toBe('5');
  });
  it('adds a digit to the end of the input', () => {
    expect(appendDigit('12', '3', 4, 10)).toBe('123');
  });
  it('does not add a digit when the input is full', () => {
    expect(appendDigit('1234', '5', 4, 10)).toBe('1234');
  });
  it('does not add a digit that is already in the input', () => {
    expect(appendDigit('12', '1', 4, 10)).toBe('12');
  });
  it('does not add a digit that is invalid for the base', () => {
    expect(appendDigit('1', '8', 4, 8)).toBe('1');
    expect(appendDigit('1', 'A', 4, 10)).toBe('1');
    expect(appendDigit('1', 'x', 4, 16)).toBe('1');
  });
  it('accepts lowercase hexadecimal digits and stores them in uppercase', () => {
    expect(appendDigit('1', 'a', 4, 16)).toBe('1A');
  });
  it('treats lowercase and uppercase as the same digit', () => {
    expect(appendDigit('1A', 'a', 4, 16)).toBe('1A');
  });
});

describe('removeLastDigit', () => {
  it('removes the last digit', () => {
    expect(removeLastDigit('123')).toBe('12');
  });
  it('returns an empty input unchanged', () => {
    expect(removeLastDigit('')).toBe('');
  });
});
