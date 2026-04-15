import * as Sentry from "@sentry/nextjs";

import { site } from "@/trustlab/utils";
import parseRobotsToMetadata from "@/trustlab/utils/parseRobotsTxt";

const HOMEPAGE_TITLES = ["home", "homepage", "index"];

// Default SEO is already defined in "@/trustlab/next-seo.config"
// Only generate SEO that changes per page or modifiable via settings.
export function getPageSeoFromMeta(page, settings) {
  const { pathname, slug, title: pageTitle } = page;
  const {
    title: pageMetaTitle,
    description: pageMetaDescription,
    image: pageMetaImage,
  } = page.meta || {};
  const {
    title: settingsMetaTitle,
    description: settingsMetaDescription,
    image: settingsMetaImage,
  } = settings.meta || {};
  const siteTitle = settingsMetaTitle?.trim() || site.name;
  const defaultTitle = siteTitle;
  const titleTemplate = `%s | ${siteTitle}`;
  const canonicalSite = site.url.replace(/\/+$/, "");
  // For homepage,  no title unless meta title is set,
  // and set canonical to site url
  let title = pageMetaTitle?.trim() || null;
  let canonical = canonicalSite;
  // For non-homepage, use page title or meta title as title,
  // and set canonical to site url + page slug
  if (!HOMEPAGE_TITLES.includes(pageTitle?.toLowerCase())) {
    title = (pageMetaTitle || pageTitle)?.trim() || null;
    // pagify sets url
    if (pathname) {
      canonical = `${canonicalSite}${pathname}`;
    } else {
      Sentry.logger.warn("Page without `pathname`", { slug, title });
      canonical = `${canonicalSite}/${slug}`;
    }
  }
  const description =
    (pageMetaDescription || settingsMetaDescription)?.trim() || null;
  const openGraph = {
    title,
    description,
    type: "website",
    site_name: siteTitle,
  };
  const image = pageMetaImage || settingsMetaImage;
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
    openGraph,
  };
}

export function parseRobotsTxt(content = "") {
  return parseRobotsToMetadata(content);
}

export default undefined;
