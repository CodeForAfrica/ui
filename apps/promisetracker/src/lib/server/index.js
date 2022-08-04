import config from "@/promisetracker/config";

/**
 * Tells us about the server itself.
 */
function server(siteSlug) {
  const slug = (siteSlug || process.env.APP_SLUG)?.trim();
  const SITE_ENV = siteSlug ? `${slug.toUpperCase()}` : "";
  const env = (NAME) =>
    process.env[`${SITE_ENV}_${NAME}`]?.trim() ||
    process.env[`NEXT_PUBLIC_${SITE_ENV}_${NAME}`]?.trim() ||
    process.env[`${NAME}`]?.trim() ||
    process.env[`NEXT_PUBLIC_${NAME}`]?.trim() ||
    config[NAME];

  const api = {
    get defaultLocale() {
      return env("I18N_DEFAULT_LOCALE");
    },
    get locales() {
      const locales = env("I18N_LOCALES");
      return Array.isArray(locales) ? locales : locales?.split(",");
    },
    get slug() {
      return slug;
    },
    env,
  };

  return api;
}

export default server;
