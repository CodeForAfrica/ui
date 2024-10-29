"use client";

import site from "@/climatemappedafrica/utils/site";

export default function payloadImageLoader({ src }) {
  // Handle relative paths (i.e. `/media`) only
  if (src?.startsWith("/media")) {
    // site.url has a trailing `/`
    return `${site.url}${src.substring(1)}`;
  }
  return src;
}
