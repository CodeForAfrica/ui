import {
  normalizeIntegerQueryList,
  parseQueryParams,
  setSearchParam,
  singleQueryValue,
} from "./queryParams";

describe("query params", () => {
  it("serializes arrays as repeated query params", () => {
    const searchParams = new URLSearchParams();

    setSearchParam(searchParams, "location", [
      "Nairobi, Kenya",
      "Lagos, Nigeria",
    ]);

    expect(searchParams.getAll("location")).toEqual([
      "Nairobi, Kenya",
      "Lagos, Nigeria",
    ]);
  });

  it("does not split comma-containing scalar query params", () => {
    expect(parseQueryParams({ location: "Nairobi, Kenya" })).toEqual({
      location: "Nairobi, Kenya",
    });
  });

  it("preserves repeated params as arrays", () => {
    expect(parseQueryParams({ year: ["2025", "2026"] })).toEqual({
      year: ["2025", "2026"],
    });
  });

  it("trims surrounding whitespace and drops blank values", () => {
    expect(parseQueryParams({ reports: ["  report-one  ", "   "] })).toEqual({
      reports: ["report-one"],
    });
  });

  it("coerces single-valued params to the last value, trimmed", () => {
    expect(singleQueryValue(["first", "last"])).toBe("last");
    expect(singleQueryValue("  solo  ")).toBe("solo");
    expect(singleQueryValue(["keep", "   "])).toBe("keep");
    expect(singleQueryValue(undefined)).toBeUndefined();
  });

  it("normalizes integer query values strictly", () => {
    expect(normalizeIntegerQueryList(["2025", "2025abc", "2026"])).toEqual([
      2025, 2026,
    ]);
  });
});
