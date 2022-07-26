import { isArray, isObject, transform, camelCase } from "lodash";

export default function convertToCamelCase(obj) {
  return transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);

    acc[camelKey] = isObject(value) ? convertToCamelCase(value) : value;
  });
}
