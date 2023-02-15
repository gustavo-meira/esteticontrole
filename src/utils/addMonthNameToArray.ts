const months = [
  'Jan.',
  'Fev.',
  'Mar.',
  'Abr.',
  'Mai.',
  'Jun.',
  'Jul.',
  'Ago.',
  'Set.',
  'Out.',
  'Nov.',
  'Dez.',
];

export const addMonthNameToArray = <T>(arr: T[]) => {
  if(arr.length === 0) return [];
  return months.map((month, index) => ({ value: arr[index], month }));
};
