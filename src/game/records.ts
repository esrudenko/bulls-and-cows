import type { GameRecord } from './gameTypes';

const compareRecords = (a: GameRecord, b: GameRecord): number => {
  if (a.attempts !== b.attempts) {
    return a.attempts - b.attempts;
  }
  return a.time - b.time;
};

export const addRecord = (
  records: readonly GameRecord[],
  newRecord: GameRecord,
  limit: number,
): readonly GameRecord[] => {
  const updatedRecords = [...records, newRecord].sort(compareRecords);
  return updatedRecords.slice(0, limit);
};
