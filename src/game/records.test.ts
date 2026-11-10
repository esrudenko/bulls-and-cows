import { describe, expect, it } from 'vitest';
import { addRecord } from './records';
import type { GameRecord } from './gameTypes';

const makeRecord = (attempts: number, time: number): GameRecord => ({
  attempts,
  time,
  base: 10,
  length: 4,
});

describe('addRecord', () => {
  it('adds a record to an empty list', () => {
    const result = addRecord([], makeRecord(5, 1000), 10);
    expect(result).toEqual([makeRecord(5, 1000)]);
  });
  it('puts the record with fewer attempts first', () => {
    const result = addRecord([makeRecord(7, 1000)], makeRecord(3, 5000), 10);
    expect(result).toEqual([makeRecord(3, 5000), makeRecord(7, 1000)]);
  });
  it('puts the faster record first when attempts are equal', () => {
    const result = addRecord([makeRecord(8, 5000)], makeRecord(8, 1000), 10);
    expect(result).toEqual([makeRecord(8, 1000), makeRecord(8, 5000)]);
  });
  it('keeps only the best records up to the limit', () => {
    const records = [makeRecord(3, 1000), makeRecord(4, 1000), makeRecord(5, 1000)];
    const result = addRecord(records, makeRecord(2, 1000), 3);
    expect(result).toEqual([makeRecord(2, 1000), makeRecord(3, 1000), makeRecord(4, 1000)]);
  });
  it('does not add a record that is worse than all records in a full list', () => {
    const records = [makeRecord(3, 1000), makeRecord(4, 1000), makeRecord(5, 1000)];
    const result = addRecord(records, makeRecord(9, 1000), 3);
    expect(result).toEqual(records);
  });
  it('does not mutate the original list', () => {
    const records = [makeRecord(5, 1000)];
    addRecord(records, makeRecord(3, 1000), 10);
    expect(records).toEqual([makeRecord(5, 1000)]);
  });
});
