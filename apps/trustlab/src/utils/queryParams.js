function isValidValue(value) {
  // Avoid Boolean because 0 can be a valid value
  return value !== undefined && value !== null && value !== "";
}

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : value;
}

export function normalizeQueryList(value) {
  const values = Array.isArray(value) ? value : [value];
  return values.map(normalizeValue).filter(isValidValue);
}

// For params that are single-valued by design: coerce to one value, taking the
// last if the param is repeated in the URL (and dropping blanks/whitespace).
export function singleQueryValue(value) {
  const values = normalizeQueryList(value);
  return values[values.length - 1];
}

export function normalizeIntegerQueryList(value) {
  return [
    ...new Set(
      normalizeQueryList(value)
        .map((item) => Number(item))
        .filter(Number.isInteger),
    ),
  ];
}

export function parseQueryParams(queryParams) {
  return Object.entries(queryParams).reduce((acc, [key, value]) => {
    const values = normalizeQueryList(value);
    if (values.length) {
      acc[key] = Array.isArray(value) ? values : values[0];
    }
    return acc;
  }, {});
}

export function setSearchParam(searchParams, key, value) {
  searchParams.delete(key);
  normalizeQueryList(value).forEach((v) => searchParams.append(key, v));
}
