import formatPagePath from "./formatPagePath";
import { Document } from "payload/types";
function formatDraftUrl(collection: string, doc: Document) {
  const pagePath = formatPagePath(collection, doc);
  if (pagePath) {
    const slug = pagePath;
    const url = new URL(
      `/api/draft?slug=${slug}`,
      process.env.PAYLOAD_PUBLIC_APP_URL,
    );
    return url.href;
  }
  return null;
}

export default formatDraftUrl;
