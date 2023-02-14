export const capitalizeEveryStartLetter = (text: string) => {
  const textSplitted = text.trim().split(' ');
  return textSplitted.reduce((acc, curr) => {
    const currFirstLetter = curr[0].toLocaleUpperCase();
    return `${acc} ${currFirstLetter}${curr.slice(1)}`.trim();
  }, '');
};
