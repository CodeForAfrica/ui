const environment = (process.env.SENTRY_ENVIRONMENT ?? "local")
  .trim()
  .toLowerCase();
const name = process.env.NEXT_PUBLIC_APP_NAME ?? "TrustLab";

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
  name,
  url,
};

export default site;
