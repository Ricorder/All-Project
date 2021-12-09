import format from "date-fns/format";

export function dateHandler(date: string): string {
  if (!date || date === '0001-01-01T00:00:00') {
    return '';
  }

  return format(new Date(date), 'dd.MM.yyyy');
}
