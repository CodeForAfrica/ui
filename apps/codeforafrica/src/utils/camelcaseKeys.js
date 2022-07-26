import camelcaseKeys from "camelcase-keys";

export default function convertToCamelCase(obj) {
  // ensure the object is an object
  if (typeof obj === "object") {
    // convert the keys to camelcase
    return camelcaseKeys(obj, { deep: true });
  }
  return obj;
}
