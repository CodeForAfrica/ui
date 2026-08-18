const name = process.env.NEXT_PUBLIC_APP_NAME ?? "RoboShield";

// see: https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
const ensureTrailingSlash = (str: string) => {
  const url = new URL(str);
  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
};
const url = ensureTrailingSlash(process.env.NEXT_PUBLIC_APP_URL as string);
let environmentUrl = url;
if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
  environmentUrl = ensureTrailingSlash(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  );
}

const isClient = typeof window !== "undefined";
const sentryDsn = isClient
  ? (window as typeof window & { SENTRY_DSN?: string }).SENTRY_DSN
  : process.env.SENTRY_DSN;

const site = {
  environmentUrl,
  name,
  sentryDsn,
  url,
};

export default site;
