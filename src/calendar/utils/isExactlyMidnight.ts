export const isExactlyMidnight = (date: Date): boolean => {
  return (
    (date.getHours() === 0 &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0) ||
    (date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0)
  );
};
