import { describe, expect, it } from 'vitest';
import { generateSecret } from './generateSecret';
import { isValidGuess } from './isValidGuess';

describe('generateSecret', () => {
  it('generates a secret with the correct length', () => {
    const secret = generateSecret(4, 10);
    expect(secret).toHaveLength(4);
  });
  it('generates a secret with unique digits', () => {
    const secret = generateSecret(4, 10);
    const uniqueDigits = new Set(secret);
    expect(uniqueDigits.size).toBe(secret.length);
  });
  it('generates a predictable secret with a fixed random source', () => {
    const fakeRandom = (): number => 0;
    const secret = generateSecret(4, 10, fakeRandom);
    expect(secret).toBe('0123');
  });
  it('generates a predictable secret with a non-zero random source', () => {
    const fakeRandom = (): number => 0.5;
    const secret = generateSecret(3, 8, fakeRandom);
    expect(secret).toBe('435');
  });
  it('generates a valid binary secret', () => {
    const fakeRandom = (): number => 0;
    const secret = generateSecret(2, 2, fakeRandom);
    expect(isValidGuess(secret, 2, 2)).toBe(true);
  });
  it('generates a valid hexadecimal secret', () => {
    const fakeRandom = (): number => 0.9;
    const secret = generateSecret(4, 16, fakeRandom);
    expect(isValidGuess(secret, 4, 16)).toBe(true);
  });
  it('generates a secret with maximum length', () => {
    const fakeRandom = (): number => 0;
    const secret = generateSecret(6, 10, fakeRandom);
    expect(secret).toBe('012345');
  });
  it('can generate hexadecimal letters', () => {
    const fakeRandom = (): number => 0.99;
    const secret = generateSecret(2, 16, fakeRandom);
    expect(secret).toBe('FE');
  });
});
