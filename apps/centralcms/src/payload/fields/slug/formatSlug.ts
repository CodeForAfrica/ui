import { FieldHook, FieldHookArgs } from "payload";

interface FieldArgs extends Partial<FieldHookArgs<any, any, any>> {
  fallback: string[];
}
const format = (val: string) =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const getFallbackData = ({ fallback, originalDoc, data }: FieldArgs) => {
  const fallbackValues = fallback.map(
    (value: string) =>
      (data && data[value]) || (originalDoc && originalDoc[value]),
  );
  return fallbackValues.join("-");
};

const formatSlug =
  (fallback: string): FieldHook =>
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
