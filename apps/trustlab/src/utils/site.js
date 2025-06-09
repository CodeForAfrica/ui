const environment = (process.env.SENTRY_ENVIRONMENT ?? "local")
  .trim()
  .toLowerCase();
const name = process.env.NEXT_PUBLIC_APP_NAME?.trim() ?? "TrustLab";

// see: https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
const ensureTrailingSlash = (string) => {
  const url = new URL(string);
  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
};
const url = ensureTrailingSlash(process.env.NEXT_PUBLIC_APP_URL);

const site = {
  environment,
  // Default image for SEO
  image: {
    alt: name,
    height: 888,
    type: "image/jpeg",
    url: `${url}image.jpg`,
    width: 1692,
  },
  name,
  url,
};

export default site;
