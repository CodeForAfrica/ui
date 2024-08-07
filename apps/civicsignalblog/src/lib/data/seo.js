import site from "@/civicsignalblog/utils/site";

function stringifyDescription(description) {
  if (!Array.isArray(description)) {
    return "";
  }
  return description.reduce((result, item) => {
    if (item.text) {
      // eslint-disable-next-line no-param-reassign
      result += item.text;
    }

    if (Array.isArray(item.children)) {
      // eslint-disable-next-line no-param-reassign
      result += stringifyDescription(item.children);
    }
    return result;
  }, "");
}

export default function getPageSeoFromMeta(page, settings) {
  const { title: pageTitle, meta: pageMeta } = page;
  const {
    title: metaTitle,
    description: metaDescription,
    image = {},
  } = pageMeta;
  const { title: settingsTitle, description: siteDescription } = settings;
  const siteTitle = settingsTitle ?? site.name;
  const title = metaTitle || pageTitle || siteTitle || null;
  const description =
    metaDescription || stringifyDescription(siteDescription) || null;
  const titleTemplate = siteTitle ? `%s | ${siteTitle}` : null;
  const defaultTitle = siteTitle || null;
  const canonical = site.url.replace(/\/+$/, "");
  const openGraph = {
    title,
    description,
    type: "website",
    site_name: siteTitle,
  };
  if (image.url) {
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
