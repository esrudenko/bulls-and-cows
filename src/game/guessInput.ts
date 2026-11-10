import { createDigitValidator } from '../core/createDigitValidator';

export const appendDigit = (input: string, digit: string, length: number, base: number): string => {
  const normalizedDigit = digit.toUpperCase();
  const isValidDigit = createDigitValidator(base);
  const isFull = input.length >= length;
  const isDuplicate = input.includes(normalizedDigit);

  if (isFull || isDuplicate || !isValidDigit(normalizedDigit)) {
    return input;
  }

  return input + normalizedDigit;
};

export const removeLastDigit = (input: string): string => input.slice(0, -1);
