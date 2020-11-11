import config from "@/promisetracker/config";
import server from "@/promisetracker/lib/server";

function i18n(site) {
  const siteServer = server(site);

  const api = {
    get defaultLocale() {
      return siteServer.defaultLocale;
    },
    get locales() {
      return siteServer.locales;
    },

    language: (locale) => config.LANGUAGE_BY_LOCALE[locale] || locale,

    /**
     * .
     * languageAlternates is not the best name in the world but
     * (Next Seo)[https://github.com/garmeeh/next-seo#nextseo-options]
     * uses it so we'll use it here as well.
     */
    languageAlternates: (asPath = "") => {
      const { url } = siteServer;
      const baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;
      let pagePath = asPath.endsWith("/") ? asPath.slice(0, -1) : asPath;
      pagePath =
        pagePath.length && !pagePath.startsWith("/")
          ? `/${pagePath}`
          : pagePath;
      const alternatives = siteServer.locales.map((locale) => ({
        hrefLang: locale,
        href: `${baseUrl}/${locale}${pagePath}`,
      }));
      alternatives.push({
        hrefLang: "x-default",
        href: `${baseUrl}${pagePath}`,
      });
      return alternatives;
    },

    localizePaths: (unlocalizedPaths) => {
      const paths = [];
      siteServer.locales.forEach((locale) => {
        unlocalizedPaths.forEach((path) => paths.push({ ...path, locale }));
      });
      return paths;
    },
  };

  return api;
}

export default i18n;
