import { describe, expect, it } from 'vitest';
import { formatTime } from './formatTime';

describe('formatTime', () => {
  it('formats zero as 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });
  it('pads seconds with a leading zero', () => {
    expect(formatTime(5000)).toBe('00:05');
  });
  it('formats minutes and seconds', () => {
    expect(formatTime(83000)).toBe('01:23');
  });
  it('rounds down to whole seconds', () => {
    expect(formatTime(1999)).toBe('00:01');
  });
  it('keeps counting minutes after an hour', () => {
    expect(formatTime(3_725_000)).toBe('62:05');
  });
  it('treats negative values as zero', () => {
    expect(formatTime(-500)).toBe('00:00');
  });
});
