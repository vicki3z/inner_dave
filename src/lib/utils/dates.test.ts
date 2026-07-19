import { describe, expect, it } from "vitest";
import { localDayString } from "@/lib/utils/dates";

describe("localDayString", () => {
  it("formats a date as YYYY-MM-DD", () => {
    // Month arg is 0-indexed: 6 = July.
    const date = new Date(2026, 6, 19);
    expect(localDayString(date)).toBe("2026-07-19");
  });

  it("zero-pads single-digit months and days", () => {
    const date = new Date(2026, 0, 5);
    expect(localDayString(date)).toBe("2026-01-05");
  });

  it("uses the local calendar day near midnight, not the UTC day", () => {
    // Both instants are the same local day (15 March 2026). In any non-UTC
    // timezone at least one of them lands on a different UTC calendar day, so
    // a UTC-based implementation would return the 14th or 16th and fail here.
    const earlyMorning = new Date(2026, 2, 15, 0, 30);
    const lateNight = new Date(2026, 2, 15, 23, 30);
    expect(localDayString(earlyMorning)).toBe("2026-03-15");
    expect(localDayString(lateNight)).toBe("2026-03-15");
  });
});
