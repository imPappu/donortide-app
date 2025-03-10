
export const formatAvailableDays = (days: string[]) => {
  if (days.length === 7) return "Every day";
  if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday")) 
    return "Weekdays";
  if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) 
    return "Weekends";
  return days.join(", ");
};
