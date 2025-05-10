export const calculateRemainingDays = (nextBillingDate: string) => {
  const today = new Date();
  const nextDate = new Date(nextBillingDate);
  
  const diffInMs = nextDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
};