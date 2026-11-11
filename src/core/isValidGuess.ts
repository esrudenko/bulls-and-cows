import { createDigitValidator } from './createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const digits = [...guess.toLowerCase()];
  const isValidDigit = createDigitValidator(base);
  const allDigitsValid = digits.every(isValidDigit);
  const uniqueDigits = new Set(digits);
  const allDigitsUnique = uniqueDigits.size === digits.length;
  const isCorrectLength = digits.length === length;

  return allDigitsValid && allDigitsUnique && isCorrectLength;
};
