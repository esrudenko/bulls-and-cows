import type { GameBase, GameLength, GameRecord } from '../game/gameTypes';

const STORAGE_KEY = 'bulls-and-cows:records';
const BASES: readonly number[] = [2, 8, 10, 16];
const LENGTHS: readonly number[] = [2, 3, 4, 5, 6];

const isGameRecord = (value: unknown): value is GameRecord => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.attempts === 'number' &&
    typeof record.time === 'number' &&
    BASES.includes(record.base as GameBase) &&
    LENGTHS.includes(record.length as GameLength)
  );
};

export const loadRecords = (): readonly GameRecord[] => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

    return Array.isArray(parsed) ? parsed.filter(isGameRecord) : [];
  } catch {
    return [];
  }
};

export const saveRecords = (records: readonly GameRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Storage can be full or blocked (private mode); the game keeps working without records.
  }
};
