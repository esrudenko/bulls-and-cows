import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './createDigitValidator';

describe('createDigitValidator', () => {
  it('accepts valid binary digits', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });
  it('accepts valid octal digits', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('0')).toBe(true);
    expect(isOctalDigit('7')).toBe(true);
    expect(isOctalDigit('8')).toBe(false);
    expect(isOctalDigit('A')).toBe(false);
  });
  it('accepts valid decimal digits', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('0')).toBe(true);
    expect(isDecimalDigit('5')).toBe(true);
    expect(isDecimalDigit('9')).toBe(true);
    expect(isDecimalDigit('A')).toBe(false);
    expect(isDecimalDigit(':')).toBe(false);
  });
  it('accepts valid hexadecimal digits', () => {
    const isHexadecimalDigit = createDigitValidator(16);
    expect(isHexadecimalDigit('0')).toBe(true);
    expect(isHexadecimalDigit('9')).toBe(true);
    expect(isHexadecimalDigit('A')).toBe(true);
    expect(isHexadecimalDigit('F')).toBe(true);
    expect(isHexadecimalDigit('a')).toBe(true);
    expect(isHexadecimalDigit('f')).toBe(true);
    expect(isHexadecimalDigit('G')).toBe(false);
    expect(isHexadecimalDigit('g')).toBe(false);
    expect(isHexadecimalDigit('AF')).toBe(false);
  });
  it.each([2, 8, 10, 16])('rejects invalid input formats for base %i', (base) => {
    const isDigit = createDigitValidator(base);
    expect(isDigit('')).toBe(false);
    expect(isDigit('12')).toBe(false);
    expect(isDigit(' ')).toBe(false);
    expect(isDigit('-')).toBe(false);
    expect(isDigit('1.5')).toBe(false);
  });
});
