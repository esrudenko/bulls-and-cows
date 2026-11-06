export const createDigitValidator = (base: number): ((digit: string) => boolean) => {
  const digits = '0123456789ABCDEF';
  const allowedDigits = digits.slice(0, base);

  return (digit: string): boolean => {
    const digitToCheck = digit.toUpperCase();
    if (digitToCheck.length !== 1) {
      return false;
    }
    return allowedDigits.includes(digitToCheck);
  };
};
