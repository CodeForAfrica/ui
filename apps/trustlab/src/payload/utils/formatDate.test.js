import formatDate from "./formatDate";

describe("payload.utils.formatDate", () => {
  it("returns null for undefined dates", () => {
    expect(formatDate()).toBeNull();
    expect(formatDate(undefined)).toBeNull();
  });

  it("returns null for null and empty dates", () => {
    expect(formatDate(null)).toBeNull();
    expect(formatDate("")).toBeNull();
  });

  it("returns null for an invalid date", () => {
    expect(formatDate("not-a-date")).toBeNull();
  });

  it("returns null for an invalid locale", () => {
    expect(formatDate("2024-01-15", { locale: "!!bad locale" })).toBeNull();
  });

  it("formats a valid date", () => {
    expect(formatDate("2024-01-15", { locale: "en-US" })).toBe(
      "January 15, 2024",
    );
  });

  it("includes the time when includeTime is set", () => {
    const formatted = formatDate("2024-01-15T13:45:30Z", {
      locale: "en-US",
      includeTime: true,
      timeZone: "UTC",
    });

    expect(formatted).toContain("January 15, 2024");
    expect(formatted).toMatch(/1:45/);
  });
});
