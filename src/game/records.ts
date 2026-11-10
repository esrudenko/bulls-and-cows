/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GameRecord } from './gameTypes';

export const addRecord = (
  records: readonly GameRecord[],
  newRecord: GameRecord,
  limit: number,
): readonly GameRecord[] => {
  return records;
};
