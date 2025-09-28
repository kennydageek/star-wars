export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const month = date.getMonth() + 1; // months are 0-based
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // last 2 digits

  return `${month}/${day}/${year}`;
};
