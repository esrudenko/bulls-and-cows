export const evaluateGuess = (secret: string, guess: string): { bulls: number; cows: number } => {
  const secretDigits = [...secret.toLowerCase()];
  const guessDigits = [...guess.toLowerCase()];
  const bulls = guessDigits.filter((digit, index) => digit === secretDigits[index]).length;
  const cows = guessDigits.filter(
    (digit, index) => digit !== secretDigits[index] && secretDigits.includes(digit),
  ).length;
  return { bulls, cows };
};
