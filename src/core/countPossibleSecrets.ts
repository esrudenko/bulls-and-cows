export const countPossibleSecrets = (length: number, base: number): number => {
  const cache = new Map<string, number>();

  const count = (remainingLength: number, remainingBase: number): number => {
    if (remainingLength === 0) {
      return 1;
    }

    if (remainingLength > remainingBase) {
      return 0;
    }
    const key = `${remainingLength}-${remainingBase}`;
    const cachedResult = cache.get(key);

    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = remainingBase * count(remainingLength - 1, remainingBase - 1);
    cache.set(key, result);
    return result;
  };

  return count(length, base);
};
