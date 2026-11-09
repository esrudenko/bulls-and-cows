import { describe, expect, it } from 'vitest';
import { createInitialState, startGame } from './gameState';

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

describe('startGame', () => {
  it('starts a game with the selected settings', () => {
    const initialState = createInitialState();
    const fakeRandom = () => 0;
    const fakeNow = 1000;
    const settings = { base: 10, length: 4 } as const;
    const newState = startGame(initialState, fakeRandom, fakeNow, settings);
    expect(newState.secret).toBe('0123');
    expect(newState.status).toBe('playing');
    expect(newState.startedAt).toBe(1000);
    expect(newState.base).toBe(10);
    expect(newState.length).toBe(4);
  });
  it('does not mutate the initial state', () => {
    const initialState = createInitialState();
    const fakeRandom = () => 0;
    const fakeNow = 1000;
    const settings = { base: 10, length: 4 } as const;

    const newState = startGame(initialState, fakeRandom, fakeNow, settings);
    expect(initialState.status).toBe('idle');
    expect(newState).not.toBe(initialState);
  });
});
