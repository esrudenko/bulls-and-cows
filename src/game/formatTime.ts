const padTwoDigits = (value: number): string => String(value).padStart(2, '0');

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(Math.max(milliseconds, 0) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${padTwoDigits(minutes)}:${padTwoDigits(seconds)}`;
};
