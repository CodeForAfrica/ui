"use client";

import site from "@/climatemappedafrica/utils/site";

export default function payloadImageLoader({ src }) {
  // Handle relative paths (/media) only
  if (src?.startsWith("/media")) {
    return `${site.url}${src}`;
  }
  return src;
}
