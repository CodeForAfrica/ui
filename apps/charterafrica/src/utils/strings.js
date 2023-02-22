export const equalsIgnoringCase = (left, right, locale = undefined) => {
  if (typeof left !== "string") {
    return left === right;
  }
  return left.localeCompare(right, locale, { sensitivity: "base" }) === 0;
};

export default {
  equalsIgnoringCase,
};
