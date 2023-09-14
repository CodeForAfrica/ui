import site from "@/codeforafrica/utils/site";

const siteUrl = new URL(site.environmentUrl).href;
function stringifyDescription(description) {
  if (!description || !Array.isArray(description)) {
    return "";
  }
  let result = "";
  description.forEach((item) => {
    if (item.text) {
      result += item.text;
    }

    if (Array.isArray(item.children)) {
      result += stringifyDescription(item.children);
    }
  });
  return result;
}

export default function getPageSeoFromMeta(page, settings) {
  const { title: pageTitle, meta: pageMeta } = page;
  const { title: metaTitle, description: metaDescription, image } = pageMeta;
  const { title: siteTitle, description: siteDescription } = settings;
  const title = metaTitle || pageTitle || siteTitle || null;
  const description =
    metaDescription || stringifyDescription(siteDescription) || null;
  const titleTemplate = siteTitle ? `%s | ${siteTitle}` : null;
  const defaultTitle = siteTitle || null;
  //   TODO: Handle canonical url for nested pages
  // NOTE: We can do this Regex because we're sure about the url contents
  //       see: https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
  const canonical = siteUrl.replace(/\/+$/, "");
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
