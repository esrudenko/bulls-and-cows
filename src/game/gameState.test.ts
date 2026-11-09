import { describe, expect, it } from 'vitest';
import { createInitialState, startGame, submitGuess } from './gameState';

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
describe('submitGuess', () => {
  it('adds a valid guess to the history', () => {
    const playingState = startGame(createInitialState(), () => 0, 1000, {
      base: 10,
      length: 4,
    });
    const newState = submitGuess(playingState, '1234', 2000);
    expect(newState.attempts.length).toBe(1);
    expect(newState.attempts[0]).toEqual({ value: '1234', bulls: 0, cows: 3 });
    expect(playingState.attempts).toEqual([]);
    expect(newState.attempts).not.toBe(playingState.attempts);
  });
  it('does not count duplicate guesses', () => {
    const playingState = startGame(createInitialState(), () => 0, 1000, {
      base: 10,
      length: 4,
    });

    const state1 = submitGuess(playingState, '1234', 2000);
    const state2 = submitGuess(state1, '1234', 3000);
    expect(state2.attempts.length).toBe(1);
  });
  it('does not add an invalid guess to the history', () => {
    const playingState = startGame(createInitialState(), () => 0, 1000, {
      base: 10,
      length: 4,
    });
    const newState = submitGuess(playingState, '1123', 2000);
    expect(newState.attempts.length).toBe(0);
  });
  it('finishes the game when the secret is guessed', () => {
    const playingState = startGame(createInitialState(), () => 0, 1000, {
      base: 10,
      length: 4,
    });

    const newState = submitGuess(playingState, '0123', 5000);
    expect(newState.status).toBe('won');
    expect(newState.finishedAt).toBe(5000);
    expect(newState.attempts.length).toBe(1);
    expect(newState.attempts[0]).toEqual({
      value: '0123',
      bulls: 4,
      cows: 0,
    });
  });
  it('does not accept guesses after winning', () => {
    const playingState = startGame(createInitialState(), () => 0, 1000, {
      base: 10,
      length: 4,
    });

    const wonState = submitGuess(playingState, '0123', 5000);
    const newState = submitGuess(wonState, '1234', 7000);

    expect(newState.attempts.length).toBe(1);
    expect(newState.status).toBe('won');
    expect(newState.finishedAt).toBe(5000);
  });
});
