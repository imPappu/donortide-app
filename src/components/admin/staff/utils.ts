
export const formatDate = (dateString: string) => {
  if (dateString === 'Never') return 'Never';
  const date = new Date(dateString);
  return date.toLocaleString();
};
