export type GameBase = 2 | 8 | 10 | 16;
export type GameLength = 2 | 3 | 4 | 5 | 6;
export type GameStatus = 'idle' | 'playing' | 'won';
export type Guess = {
  readonly value: string;
  readonly bulls: number;
  readonly cows: number;
};
export type GameState = {
  readonly secret: string;
  readonly attempts: readonly Guess[];
  readonly status: GameStatus;
  readonly base: GameBase;
  readonly length: GameLength;
  readonly startedAt: number | null;
  readonly finishedAt: number | null;
};
export type GameRecord = {
  readonly attempts: number;
  readonly time: number;
  readonly base: GameBase;
  readonly length: GameLength;
};
