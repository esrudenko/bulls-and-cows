import { DIGITS } from './constants';

export const createDigitValidator = (base: number): ((digit: string) => boolean) => {
  const allowedDigits = DIGITS.slice(0, base);

  return (digit: string): boolean => {
    const digitToCheck = digit.toUpperCase();
    if (digitToCheck.length !== 1) {
      return false;
    }
    return allowedDigits.includes(digitToCheck);
  };
};
