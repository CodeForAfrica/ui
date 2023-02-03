import { deepmerge } from "@mui/utils";

import site from "@/charterafrica/utils/site";

const siteUrl = new URL(site.environmentUrl).href;

function localeToLanguageAlternative(locale, pathname) {
  const separator = !pathname || pathname.startsWith("/") ? "" : `/`;
  const hrefLang = locale;
  const { href } = new URL(`/${locale}${separator}${pathname}`, siteUrl);
  return { hrefLang, href };
}

function pageSeoFromMeta(page, settings, options = {}) {
  const { locale, locales, pathname } = options;
  let canonical = null;
  if (pathname) {
    canonical = new URL(pathname, siteUrl).toString();
  }
  let languageAlternates = null;
  if (locales?.length) {
    languageAlternates = locales.map((l) =>
      localeToLanguageAlternative(l, pathname)
    );
  }
  const { title: pageTitle, meta: pageMeta } = page;
  const {
    meta: settingsMeta,
    title: settingsTitle,
    description: settingsDescription,
  } = settings;
  const name = settingsTitle || site.name;
  const titleTemplate = name ? `%s | ${name}` : null;
  const additionalMeta = [settingsMeta, { title: pageTitle }, pageMeta];
  const meta = additionalMeta.reduce(
    (acc, curr) => deepmerge(acc, curr, { clone: false }),
    { title: settingsTitle, description: settingsDescription }
  );
  const { title = null, description = null, image } = meta;
  const openGraph = {
    locale: locale || null,
    site_name: name,
  };
  if (image?.url) {
    const { alt, height, mimeType: type, url, width } = image;
    openGraph.images = [
      {
        alt: alt || name,
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
    description,
    canonical,
    languageAlternates,
    openGraph,
  };
}

export default pageSeoFromMeta;
