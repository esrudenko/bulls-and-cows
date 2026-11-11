import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from './countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('returns the correct count for a simple case', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });
  it('returns the correct count for a decimal secret', () => {
    expect(countPossibleSecrets(3, 10)).toBe(720);
  });
  it('returns the correct count for a hexadecimal secret', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });
  it('returns 1 when length is zero', () => {
    expect(countPossibleSecrets(0, 2)).toBe(1);
  });
  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });
});
