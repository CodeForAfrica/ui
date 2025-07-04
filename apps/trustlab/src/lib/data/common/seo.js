import { site } from "@/trustlab/utils";

const HOMEPAGE_TITLES = ["home", "homepage", "index"];

// Default SEO is already defined in "@/trustlab/next-seo.config"
// Only generate SEO that changes per page or modifiable via settings.
export function getPageSeoFromMeta(page, settings) {
  const {
    title: pageTitle,
    meta: {
      title: pageMetaTitle,
      description: pageMetaDescription,
      image: pageMetaImage,
    },
  } = page;
  const {
    meta: {
      title: settingsMetaTitle,
      description: settingsMetaDescription,
      image: settingsMetaImage,
    },
  } = settings;
  const siteTitle = settingsMetaTitle?.trim() || site.name;
  const defaultTitle = siteTitle;
  const titleTemplate = `%s | ${siteTitle}`;
  let title = null;
  if (pageMetaTitle || !HOMEPAGE_TITLES.includes(pageTitle?.toLowerCase())) {
    title = (pageMetaTitle || pageTitle)?.trim() || null;
  }
  const description =
    (pageMetaDescription || settingsMetaDescription)?.trim() || null;
  const canonical = site.url.replace(/\/+$/, "");
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

export default undefined;
