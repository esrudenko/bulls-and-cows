import { describe, expect, it } from 'vitest';
import { createInitialState } from './gameState';

describe('createInitialState', () => {
  it('creates an initial game state with default settings', () => {
    expect(createInitialState()).toEqual({
      secret: '',
      attempts: [],
      status: 'idle',
      base: 10,
      length: 4,
      startedAt: null,
      finishedAt: null,
    });
  });
  it('creates independent game states', () => {
    const state1 = createInitialState();
    const state2 = createInitialState();
    expect(state1.attempts).not.toBe(state2.attempts);
    expect(state1).not.toBe(state2);
  });
});
