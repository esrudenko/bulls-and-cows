export const pluralize = (count: number, word: string): string =>
  `${count} ${count === 1 ? word : `${word}s`}`;

export const formatResult = (bulls: number, cows: number): string =>
  `${pluralize(bulls, 'bull')}, ${pluralize(cows, 'cow')}`;
