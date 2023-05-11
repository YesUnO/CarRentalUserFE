export const isDateInRange = (
  startDate: Date | null,
  endDate: Date | null,
  dates: Date[]
) => {
  if (startDate == null || endDate == null) {
    return false;
  }
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    if (date >= startDate && date <= endDate) {
      return true;
    }
  }
  return false;
};
