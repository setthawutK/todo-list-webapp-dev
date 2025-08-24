export function convertDate(dates: (string | Date)[]): string[] {
  return dates.map(date => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else if (typeof date === 'string') {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    }
    throw new Error('Invalid date format');
  });
}

export function invertDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function invertDatesRange(start: string, end: string): string[] {
  return [invertDate(start), invertDate(end)];
}
