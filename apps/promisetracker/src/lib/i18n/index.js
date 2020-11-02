import config from "@/promisetracker/config";

function i18n(site) {
  const SITE = site?.length ? `${site.trim().toUpperCase()}_` : "";
  const DEFAULT_LOCALE =
    process.env[`${SITE}DEFAULT_LOCALE`] || config.DEFAULT_LOCALE;
  const LOCALES = process.env[`${SITE}LOCALES`] || config.LOCALES;

  const api = {
    get defaultLocale() {
      return DEFAULT_LOCALE;
    },
    get locales() {
      return LOCALES;
    },
    localizePaths: (params) => {
      const paths = [];
      LOCALES.forEach((locale) => {
        params.forEach((param) => paths.push({ ...param, locale }));
      });
      return paths;
    },
  };

  return api;
}

export default i18n;
