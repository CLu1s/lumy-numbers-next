import { format as formatFns } from "date-fns";
import isBefore from "date-fns/isBefore";
import { es } from "date-fns/locale";

export default function formatDate(date: Date, format: string): string {
  return formatFns(date, format, {
    locale: es,
  });
}

export const compareDates = (date1: Date, date2: Date): number => {
  if (isBefore(date1, date2)) {
    return -1;
  }
  if (isBefore(date2, date1)) {
    return 1;
  }
  return 0;
};
