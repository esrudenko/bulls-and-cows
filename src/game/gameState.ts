import { generateSecret } from '../core/generateSecret';
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
  void guess;
  void now;

  return state;
};
