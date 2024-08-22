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

function mediaToImage(media, title) {
  if (!media?.url) {
    return null;
  }
  const { height, mimeType: type, url, width } = media;
  const image = { height, url, width };
  if (type) {
    image.type = type;
  }
  const alt = media.alt || title;
  if (alt) {
    image.alt = alt;
  }
  return image;
}

export default function getPageSeoFromMeta(page, settings) {
  const canonical = page.meta?.canonical || site.url.replace(/\/+$/, "");
  const defaultTitle = settings.meta?.title || settings.title || site.name;
  const title = page.meta?.title || page.title || defaultTitle;
  // Dont't use template on homepage
  const titleTemplate =
    page.slug !== "index" ? defaultTitle && `%s | ${defaultTitle}` : null;
  const description =
    page.meta?.description ||
    settings.meta?.description ||
    stringifyDescription(settings.description);
  const openGraph = {
    type: "website",
    siteName: defaultTitle,
  };
  if (page.meta?.article) {
    const { article } = page.meta;
    openGraph.type = "article";
    openGraph.article = {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    };
    const { authors, tags } = article;
    if (authors?.length) {
      openGraph.article.authors = authors;
    }
    if (tags?.length) {
      openGraph.tags = tags;
    }
  }
  const image =
    mediaToImage(page.meta?.image, title) ||
    mediaToImage(settings.meta?.image, title);
  if (image) {
    openGraph.images = [image];
  }
  const seo = {
    title,
    titleTemplate,
    defaultTitle,
    description,
    canonical,
    openGraph,
  };

  return Object.fromEntries(Object.entries(seo).filter(([, val]) => val));
}
