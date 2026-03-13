// site can be called on the server and client, so we need to ensure that
// i. We don't rely on process.env variables that may not be defined in the browser, and
// ii. We don't use any browser-specific APIs (e.g. window) without checking
// for their existence first.
// NOTE: environment should only be used on the server, as it is not guaranteed to be
//       defined in the browser.
// All runtime env vars that differ between server and client are resolved here via
// window.* (injected by _document.page.js) on the client and process.env on the server.

const environment = process?.env?.SENTRY_ENVIRONMENT?.trim().toLowerCase();
const name = process?.env?.APP_NAME?.trim() ?? "TrustLab";
const isClient = typeof window !== "undefined";
const sentryDsn = isClient ? window.SENTRY_DSN : process.env.SENTRY_DSN;
const seoDisabled =
  (isClient ? window.SEO_DISABLED : process.env.SEO_DISABLED)
    ?.trim()
    ?.toLowerCase() === "true";

// see: https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
function ensureTrailingSlash(string) {
  const url = new URL(string);
  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
}

const url = ensureTrailingSlash(
  isClient ? window.location.origin : process.env.APP_URL,
);

const site = {
  environment,
  seoDisabled,
  sentryDsn,
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
