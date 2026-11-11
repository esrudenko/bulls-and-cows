export const isValidSettings = (base: number, length: number): boolean => {
  const isValidLength = length >= 2 && length <= 6;
  const fitsInBase = length <= base;

  const allowedBases = [2, 8, 10, 16];
  const isValidBase = allowedBases.includes(base);

  return isValidLength && fitsInBase && isValidBase;
};
