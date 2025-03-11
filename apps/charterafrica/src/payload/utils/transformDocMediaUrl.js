const transformDocMediaUrl = (doc) => {
  // Can't use absolute URLs in src because we set PAYLOAD_PUBLIC_APP_URL to localhost at build-time & will lead to 404 at runtime
  // Solution: use relative URLs
  const { pathname } = new URL(doc.url);
  return {
    ...doc,
    alt: doc.alt ?? null,
    src: pathname,
    url: pathname,
  };
};

export default transformDocMediaUrl;
