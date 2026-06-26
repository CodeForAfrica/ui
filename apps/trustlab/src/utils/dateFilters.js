import { normalizeIntegerQueryList } from "./queryParams";

const DEFAULT_START_YEAR = 2000;

function dateRangeCondition(field, start, end) {
  return {
    and: [
      { [field]: { greater_than_equal: start.toISOString() } },
      { [field]: { less_than: end.toISOString() } },
    ],
  };
}

function monthRange(year, month, field) {
  const monthIndex = month - 1;
  return dateRangeCondition(
    field,
    new Date(Date.UTC(year, monthIndex, 1)),
    new Date(Date.UTC(year, monthIndex + 1, 1)),
  );
}

function yearRange(year, field) {
  return dateRangeCondition(
    field,
    new Date(Date.UTC(year, 0, 1)),
    new Date(Date.UTC(year + 1, 0, 1)),
  );
}

export function buildDateRangeCondition({
  currentYear = new Date().getFullYear(),
  defaultStartYear = DEFAULT_START_YEAR,
  field = "date",
  month,
  year,
} = {}) {
  const yearValues = normalizeIntegerQueryList(year);
  const monthValues = normalizeIntegerQueryList(month).filter(
    (m) => m >= 1 && m <= 12,
  );

  const ranges = [];
  if (yearValues.length && monthValues.length) {
    yearValues.forEach((y) => {
      monthValues.forEach((m) => ranges.push(monthRange(y, m, field)));
    });
  } else if (yearValues.length) {
    yearValues.forEach((y) => ranges.push(yearRange(y, field)));
  } else if (monthValues.length) {
    for (let y = defaultStartYear; y <= currentYear; y += 1) {
      monthValues.forEach((m) => ranges.push(monthRange(y, m, field)));
    }
  }

  if (!ranges.length) {
    return null;
  }
  if (ranges.length === 1) {
    return ranges[0];
  }
  return { or: ranges };
}
