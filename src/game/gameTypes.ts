export type GameBase = 2 | 8 | 10 | 16;
export type GameLength = 2 | 3 | 4 | 5 | 6;
export type GameStatus = 'idle' | 'playing' | 'won';
export type Guess = {
  value: string;
  bulls: number;
  cows: number;
};
export type GameState = {
  secret: string;
  attempts: Guess[];
  status: GameStatus;
  base: GameBase;
  length: GameLength;
  startedAt: number | null;
  finishedAt: number | null;
};
