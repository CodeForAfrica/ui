import config from "@/promisetracker/config";

/**
 * Tells us about the server itself.
 */
function server(site) {
  const SITE = site?.length ? `${site.trim().toUpperCase()}_` : "";
  const SITE_URL = process.env[`${SITE}URL`] || config.URL;
  const SITE_DEFAULT_LOCALE =
    process.env[`${SITE}DEFAULT_LOCALE`] || config.DEFAULT_LOCALE;
  const SITE_LOCALES_STRING = process.env[`${SITE}LOCALES`];
  const SITE_LOCALES = SITE_LOCALES_STRING?.split(",") || config.LOCALES;

  const api = {
    get defaultLocale() {
      return SITE_DEFAULT_LOCALE;
    },
    get locales() {
      return SITE_LOCALES;
    },
    get site() {
      return SITE;
    },
    get url() {
      return SITE_URL;
    },
  };

  return api;
}

export default server;
