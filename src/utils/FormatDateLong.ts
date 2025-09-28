export const formatDateLong = (dateString?: string): string => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);

  if (!year || !month || !day) return '';

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
