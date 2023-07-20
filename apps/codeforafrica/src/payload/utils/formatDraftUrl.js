import formatPagePath from "./formatPagePath";

function formatDraftUrl(collection, doc) {
  const pagePath = formatPagePath(collection, doc);
  if (pagePath) {
    const slug = pagePath;
    const url = new URL(
      `/api/v1/draft?slug=${slug}`,
      process.env.PAYLOAD_PUBLIC_CFA_APP_URL
    );
    return url.href;
  }
  return null;
}

export default formatDraftUrl;
