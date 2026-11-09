import type { GameState } from './gameTypes';

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
