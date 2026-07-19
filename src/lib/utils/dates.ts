/**
 * The given date's calendar day in the local timezone as `YYYY-MM-DD`.
 *
 * Uses the machine's local date parts (not UTC) because this underpins what
 * "today" means for check-ins - a late-evening entry must count as the local
 * day, even when UTC has already rolled over.
 */
export function localDayString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
