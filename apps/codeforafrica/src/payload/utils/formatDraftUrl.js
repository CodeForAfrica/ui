function formatDraftUrl(collection, doc, { locale }) {
  const pagePath = `/${collection}/${doc.slug}`;
  if (pagePath) {
    const localePath = locale && locale !== "en" ? `/${locale}` : "";
    const slug = `${localePath}${pagePath}`;
    const url = new URL(
      `/api/v1/draft?slug=${slug}`,
      process.env.PAYLOAD_PUBLIC_APP_URL
    );

    return url.href;
  }
  return null;
}

export default formatDraftUrl;
