import { format as formatFns } from "date-fns";
import { es } from "date-fns/locale";

export default function formatDate(date: Date, format: string): string {
  return formatFns(date, format, {
    locale: es,
  });
}
