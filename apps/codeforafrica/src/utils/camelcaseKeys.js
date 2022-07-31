import camelcaseKeys from "camelcase-keys";

export default function convertToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item, { deep: true }));
  }
  if (typeof obj === "object" && obj !== null) {
    return camelcaseKeys(obj, { deep: true });
  }
  return obj;
}
