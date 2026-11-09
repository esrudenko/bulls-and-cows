import { describe, expect, it } from 'vitest';
import { isValidSettings } from './isValidSettings';

describe('isValidSettings', () => {
  it('allows only length 2 for binary', () => {
    expect(isValidSettings(2, 2)).toBe(true);
    expect(isValidSettings(2, 4)).toBe(false);
  });
  it('allows lengths from 2 to 6 for other bases', () => {
    expect(isValidSettings(8, 6)).toBe(true);
    expect(isValidSettings(10, 4)).toBe(true);
    expect(isValidSettings(16, 2)).toBe(true);
  });
  it('rejects lengths outside the allowed range', () => {
    expect(isValidSettings(10, 1)).toBe(false);
    expect(isValidSettings(10, 7)).toBe(false);
  });
});
