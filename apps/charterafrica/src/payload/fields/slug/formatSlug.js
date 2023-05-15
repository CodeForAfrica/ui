const format = (val) =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const getFallbackData = ({ fallback, originalDoc, data }) => {
  let fallbackData = "";
  fallback.forEach((value, i) => {
    const prefix = i === 0 ? "" : "-";
    fallbackData += `${prefix}${
      (data && data[value]) || (originalDoc && originalDoc[value])
    }`;
  });
  return fallbackData;
};

const formatSlug =
  (fallback) =>
  ({ value, originalDoc, data }) => {
    if (value && typeof value === "string") {
      return format(value);
    }

    const validFallback = typeof fallback === "string" ? [fallback] : fallback;
    const fallbackData = getFallbackData({
      fallback: validFallback,
      originalDoc,
      data,
    });

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }
    return value;
  };

export default formatSlug;
