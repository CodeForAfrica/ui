import { deepmerge } from "@mui/utils";

import site from "@/charterafrica/utils/site";

const siteUrl = new URL(site.environmentUrl).href;

function getLocaleUrl(pathname, locale, defaultLocale) {
  const separator = !pathname || pathname.startsWith("/") ? "" : `/`;
  // By default, default locale doesn't include prefix
  let prefix = `/${locale}`;
  if (locale === defaultLocale) {
    prefix = "";
  }
  const { href } = new URL(`${prefix}${separator}${pathname}`, siteUrl);
  // NOTE: We can do this Regex because we're sure about the url contents
  //       see: https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
  return href.replace(/\/+$/, "");
}

function getLanguageAlternates(options) {
  const { defaultLocale, locale, locales, pathname } = options;
  if (!(locale && locales?.length)) {
    return null;
  }

  const languageAlternateForLocale = (loc) => {
    const hrefLang = loc;
    const href = getLocaleUrl(pathname, loc, defaultLocale);
    return { hrefLang, href };
  };
  return locales.map(languageAlternateForLocale);
}

export function getPageSeoFromMeta(page, settings, options = {}) {
  const { defaultLocale, locale, pathname } = options;
  let canonical = null;
  if (pathname) {
    canonical = getLocaleUrl(pathname, locale, defaultLocale);
  }
  const languageAlternates = getLanguageAlternates(options);
  const { title: pageTitle, meta: pageMeta } = page;
  const {
    meta: settingsMeta,
    title: settingsTitle,
    description: settingsDescription,
  } = settings;
  const defaultTitle = settingsTitle || site.name || null;
  const titleTemplate = defaultTitle ? `%s | ${defaultTitle}` : null;
  const additionalMeta = [settingsMeta, { title: pageTitle }, pageMeta];
  const meta = additionalMeta.reduce(
    (acc, curr) => deepmerge(acc, curr, { clone: false }),
    { title: settingsTitle, description: settingsDescription }
  );

  const { title = null, description = null, image } = meta;
  const openGraph = {
    locale: locale || null,
    site_name: defaultTitle,
  };
  if (image?.url) {
    const { alt, height, mimeType: type, url, width } = image;
    openGraph.images = [
      {
        alt: alt || title || defaultTitle,
        height,
        type,
        url,
        width,
      },
    ];
  }

  return {
    title,
    titleTemplate,
    defaultTitle,
    description,
    canonical,
    languageAlternates,
    openGraph,
  };
}

export default {
  getPageSeoFromMeta,
};
