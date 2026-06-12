import formatDate from "./formatDate";

describe("payload.utils.formatDate", () => {
  it("returns null for missing dates", () => {
    expect(formatDate()).toBeNull();
    expect(formatDate(null)).toBeNull();
    expect(formatDate(undefined)).toBeNull();
    expect(formatDate("")).toBeNull();
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

  it("returns null when formatting throws", () => {
    expect(formatDate("2024-01-15", { locale: "!!bad locale" })).toBeNull();
  });
});
