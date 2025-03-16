
// Calculate progress values for statistics
export const calculateProgress = (current: number, target: number) => {
  if (target <= 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(Math.round(progress), 100);
};
