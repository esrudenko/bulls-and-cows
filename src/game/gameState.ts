import type { GameState } from './gameTypes';
import type { GameBase } from './gameTypes';
import type { GameLength } from './gameTypes';

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
  void random;
  void now;
  void settings;

  return state;
};
