export const getHourAndMinutesFromDate = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '00');
  const minutes = date.getMinutes().toString().padStart(2, '00');

  return `${hours}:${minutes}`;
};
