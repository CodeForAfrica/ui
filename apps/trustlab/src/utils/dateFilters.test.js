import { buildDateRangeCondition } from "./dateFilters";

describe("date filters", () => {
  it("builds year and month combinations", () => {
    const condition = buildDateRangeCondition({
      year: ["2025", "2026"],
      month: ["1", "2"],
    });

    expect(condition.or).toHaveLength(4);
  });

  it("builds month-only ranges across years", () => {
    const condition = buildDateRangeCondition({
      currentYear: 2026,
      defaultStartYear: 2024,
      month: ["1"],
    });

    expect(condition.or).toHaveLength(3);
    expect(condition.or[0].and[0]).toEqual({
      date: { greater_than_equal: "2024-01-01T00:00:00.000Z" },
    });
    expect(condition.or[2].and[1]).toEqual({
      date: { less_than: "2026-02-01T00:00:00.000Z" },
    });
  });

  it("returns a single and-condition for one range", () => {
    expect(buildDateRangeCondition({ year: ["2025"] })).toEqual({
      and: [
        { date: { greater_than_equal: "2025-01-01T00:00:00.000Z" } },
        { date: { less_than: "2026-01-01T00:00:00.000Z" } },
      ],
    });
  });

  it("returns null when no year or month is provided", () => {
    expect(buildDateRangeCondition({})).toBeNull();
  });
});
