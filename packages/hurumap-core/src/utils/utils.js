/* eslint-disable import/prefer-default-export */
export function idify(string) {
  return string
    .replace(/^\s+|\s+$/g, "")
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_");
}
