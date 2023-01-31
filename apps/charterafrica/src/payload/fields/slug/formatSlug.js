const format = (val) =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback) =>
  ({ value, originalDoc, data }) => {
    if (value && typeof value === "string") {
      return format(value);
    }

    const fallbackData =
      (data && data[fallback]) || (originalDoc && originalDoc[fallback]);
    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }
    return value;
  };

export default formatSlug;
