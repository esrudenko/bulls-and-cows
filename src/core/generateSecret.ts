import { DIGITS } from './constants';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  const pickDigits = (availableDigits: string[], count: number): string => {
    if (count === 0) {
      return '';
    }

    const randomIndex = Math.floor(random() * availableDigits.length);
    const selectedDigit = availableDigits[randomIndex];
    const remainingDigits = availableDigits.filter((digit) => digit !== selectedDigit);

    return selectedDigit + pickDigits(remainingDigits, count - 1);
  };

  return pickDigits([...DIGITS.slice(0, base)], length);
};
