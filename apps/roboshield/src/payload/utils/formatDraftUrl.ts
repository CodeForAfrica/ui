import formatPagePath from "./formatPagePath";
import type { Document } from "payload";

const payloadUrl =
  process.env.PAYLOAD_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_APP_URL;

function formatDraftUrl(collection: string, doc: Document) {
  const pagePath = formatPagePath(collection, doc);
  if (pagePath) {
    const slug = pagePath;
    const url = new URL(`/api/draft?slug=${slug}`, payloadUrl);
    return url.href;
  }
  return null;
}

export default formatDraftUrl;
