export const sum = (a: number[]): number => {
  return a.reduce(
    (previousValue, currentValue, currentIndex, array) => previousValue + currentValue
  );
};
