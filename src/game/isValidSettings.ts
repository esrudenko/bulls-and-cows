export const isValidSettings = (base: number, length: number): boolean => {
  const isValidLength = length >= 2 && length <= 6;
  const isValidBinaryLength = base !== 2 || length === 2;

  const allowedBases = [2, 8, 10, 16];
  const isValidBase = allowedBases.includes(base);

  return isValidLength && isValidBinaryLength && isValidBase;
};
