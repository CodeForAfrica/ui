import config from "@/promisetracker/config";

/**
 * Tells us about the server itself.
 */
function server(siteSlug) {
  const slug = siteSlug?.trim();
  const SITE_ENV = siteSlug ? `${slug.toUpperCase()}` : "";
  const env = (NAME) =>
    process.env[`${SITE_ENV}_${NAME}`]?.trim() ||
    process.env[`${NAME}`]?.trim() ||
    config[NAME];

  const api = {
    get defaultLocale() {
      return env("DEFAULT_LOCALE");
    },
    get locales() {
      const locales = env("LOCALES");
      return Array.isArray(locales) ? locales : locales?.split(",");
    },
    get slug() {
      return slug;
    },
    get url() {
      return env("URL");
    },
    env,
  };

  return api;
}

export default server;
