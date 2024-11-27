import fetchJson from "./fetchJson";
import toCamelCase from "./wordToCamelCase";

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = sizes[i];

  return `${parseFloat((bytes / k ** i).toFixed(decimals))} ${size}`;
};

export { toCamelCase, fetchJson, formatBytes };
