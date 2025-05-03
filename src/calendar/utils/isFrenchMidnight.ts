export const isFrenchMidnight = (date: Date): boolean => {
  return (
    date.getUTCHours() === 22 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0
  );
};
