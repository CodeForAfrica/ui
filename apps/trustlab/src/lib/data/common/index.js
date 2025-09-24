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
  // We only have 2 slugs for the page, e.g. ["about"] or ["opportunities/opportunities-name"]
  // The first slug is the page
  const pageSlugIndex = 0;
  return params?.slugs?.[pageSlugIndex] || "index";
}

function getDefaultErrorPageProps(slug = "404") {
  if (slug === "500") {
    return {
      blocks: [
        {
          title: "Server Error.",
          subtitle: [
            {
              children: [
                {
                  text: "Don't worry!, you can head back to our ",
                  children: null,
                },
                {
                  type: "link",
                  newTab: false,
                  url: "/",
                  children: [
                    {
                      text: "homepage",
                      children: null,
                    },
                  ],
                  href: "/",
                },
                {
                  text: "check out our most recent ",
                  children: null,
                },
                {
                  type: "link",
                  newTab: false,
                  url: "/projects",
                  children: [
                    {
                      text: "projects",
                      children: null,
                    },
                  ],
                  href: "/projects",
                },
                {
                  text: ", or read below some of the contents produced by our amazing team while the technical team is working on fixing the issue.",
                  children: null,
                },
              ],
            },
          ],
          slug: "error",
        },
      ],
    };
  }

  return {
    blocks: [
      {
        title: "Whoops! This page got lost in conversation! ",
        subtitle: [
          {
            children: [
              {
                text: "Don't worry!, you can head back to our ",
                children: null,
              },
              {
                type: "link",
                newTab: false,
                url: "/",
                children: [
                  {
                    text: "homepage",
                    children: null,
                  },
                ],
                href: "/",
              },
              {
                text: "check out our most recent ",
                children: null,
              },
              {
                type: "link",
                newTab: false,
                url: "/projects",
                children: [
                  {
                    text: "projects",
                    children: null,
                  },
                ],
                href: "/projects",
              },
              {
                text: ", or read below some of the contents produced by our amazing team.",
                children: null,
              },
            ],
          },
        ],
        slug: "error",
      },
    ],
  };
}

export async function getPagePaths(api) {
  const { docs: pages } = await api.getCollection("pages", {
    where: { slug: { not_equals: "404" } },
  });

  const pagesPromises = pages.map(async ({ slug }) => ({
    params: {
      slugs: [slug === "index" ? "" : slug],
    },
  }));
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
    if (["404", "500"].includes(slug)) {
      return getDefaultErrorPageProps(slug);
    }
    return null;
  }
  if (params?.slugs?.length > 1) {
    page = await pagify(page, api, context);
    if (!page) {
      return null;
    }
  }

  const blocks = await blockify(page?.blocks, api, context);
  const { analytics } = siteSettings;
  const seo = getPageSeoFromMeta(page, siteSettings);
  return {
    analytics,
    blocks,
    footer,
    navbar,
    seo,
  };
}

export default getPageProps;
