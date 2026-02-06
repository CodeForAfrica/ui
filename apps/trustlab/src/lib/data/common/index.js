import { getPageSeoFromMeta } from "./seo";

import blockify from "@/trustlab/lib/data/blockify";
import pagify from "@/trustlab/lib/data/pagify";

function imageFromMedia({ alt, url }) {
  return { alt, src: url ?? null };
}
function getNavBar(settings) {
  const {
    connect: { links = [] },
    primaryLogo: media,
    primaryNavigation: { menus = null, connect, searchButtonLabel = null } = {},
    title,
  } = settings;
  const socialLinks = links.filter((link) => link.platform === connect);

  return {
    logo: imageFromMedia({ alt: title, ...media }),
    menus,
    socialLinks,
    searchButtonLabel,
  };
}

function getFooter(settings) {
  const {
    primaryLogo,
    primaryNavigation,
    secondaryLogo,
    secondaryNavigation,
    title,
    ...footer
  } = settings;

  return {
    ...footer,
    logo: imageFromMedia({ alt: title, ...(secondaryLogo || primaryLogo) }),
    primaryNavigation,
    secondaryNavigation,
  };
}
function getPageSlug({ params }) {
  if (!params?.slugs?.length) {
    return "index";
  }
  let pageSlugIndex = params.slugs.length - 1;
  if (params.slugs.length > 2) {
    pageSlugIndex = params.slugs.length - 2;
  }
  const index = pageSlugIndex >= 0 ? pageSlugIndex : 0;
  return params.slugs[index] || "index";
}

export const getErrorPageProps = async (api, slug = "404") => {
  const siteSettings = await api.findGlobal("site-settings");
  const {
    docs: [page],
  } = await api.findPage(slug, {});
  const navbar = getNavBar(siteSettings);
  const footer = getFooter(siteSettings);
  const { analytics } = siteSettings;
  return {
    analytics,
    footer,
    navbar,
    blocks: page?.blocks || [],
  };
};

export async function getPagePaths(api) {
  const { docs: pages } = await api.getCollection("pages", {
    where: { slug: { not_equals: "500" } },
  });

  const pagesPromises = pages.map(async ({ slug }) => {
    // Ensure slug is always a valid string
    const validSlug = slug || "index";
    return {
      params: {
        slugs: validSlug === "index" ? [] : [validSlug],
      },
    };
  });
  const paths = await Promise.all(pagesPromises);
  return {
    paths,
    fallback: true,
  };
}

export async function getPageProps(api, context) {
  const { draftMode = false, params } = context;
  const slug = getPageSlug(context);
  let {
    docs: [page],
  } = await api.findPage(slug, {
    draft: draftMode,
  });
  const siteSettings = await api.findGlobal("site-settings");
  const navbar = getNavBar(siteSettings);
  const footer = getFooter(siteSettings);

  if (!page) {
    const errorSlug = ["404", "500"].includes(slug) ? slug : "404";
    page = await getErrorPageProps(api, errorSlug);
  }

  if (params?.slugs?.length > 2) {
    page = await pagify(page, api, context);
    if (!page) {
      page = await getErrorPageProps(api);
    }
  }

  const blocks = await blockify(page?.blocks, api, context);
  const { analytics } = siteSettings;
  let seo = null;
  if (page?.meta) {
    seo = getPageSeoFromMeta(page, siteSettings);
  }
  return {
    analytics,
    blocks,
    footer,
    navbar,
    seo,
  };
}

export default getPageProps;
