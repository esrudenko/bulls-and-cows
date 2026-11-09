export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  const digits = '0123456789ABCDEF';
  let availableDigits = [...digits.slice(0, base)];

  const secret = Array.from({ length })
    .map(() => {
      const randomIndex = Math.floor(random() * availableDigits.length);
      const selectedDigit = availableDigits[randomIndex];

      availableDigits = availableDigits.filter((digit) => digit !== selectedDigit);

      return selectedDigit;
    })
    .join('');

  return secret;
};
