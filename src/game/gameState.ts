import { generateSecret } from '../core/generateSecret';
import { isValidGuess } from '../core/isValidGuess';
import { evaluateGuess } from '../core/evaluateGuess';
import type { GameState, GameBase, GameLength } from './gameTypes';

export const createInitialState = (): GameState => {
  return {
    secret: '',
    attempts: [],
    status: 'idle',
    base: 10,
    length: 4,
    startedAt: null,
    finishedAt: null,
  };
};

export const startGame = (
  state: GameState,
  random: () => number,
  now: number,
  settings: { base: GameBase; length: GameLength },
): GameState => {
  const secret = generateSecret(settings.length, settings.base, random);
  return {
    ...state,
    secret,
    attempts: [],
    status: 'playing',
    base: settings.base,
    length: settings.length,
    startedAt: now,
    finishedAt: null,
  };
};

export const submitGuess = (state: GameState, guess: string, now: number): GameState => {
  if (state.status !== 'playing') {
    return state;
  }
  const isValid = isValidGuess(guess, state.length, state.base);
  const isDuplicate = state.attempts.some(
    (attempt) => attempt.value.toLowerCase() === guess.toLowerCase(),
  );

  if (!isValid || isDuplicate) {
    return state;
  }
  const result = evaluateGuess(state.secret, guess);
  const newAttempt = {
    value: guess,
    bulls: result.bulls,
    cows: result.cows,
  };
  const newAttempts = [...state.attempts, newAttempt];
  const isWon = result.bulls === state.length;
  const newStatus = isWon ? 'won' : 'playing';
  const newFinishedAt = isWon ? now : null;
  return {
    ...state,
    attempts: newAttempts,
    status: newStatus,
    finishedAt: newFinishedAt,
  };
};
