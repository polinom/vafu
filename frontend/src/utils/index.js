export function formatDateAsMonthYear(dateStr) {
  if (dateStr === null) return '-/-';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const date = new Date(dateStr);

  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${year}`;
}

export function calcProgress(now, total) {
  if (now === null || total === null) return 0;

  return Math.min(Math.round((now * 100) / total), 100);
}
