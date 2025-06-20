import { getPageSeoFromMeta } from "./seo";

import blockify from "@/trustlab/lib/data/blockify";

function imageFromMedia({ alt, url }) {
  return { alt, src: url ?? null };
}
function getNavBar(settings) {
  const {
    connect: { links = [] },
    primaryLogo: media,
    primaryNavigation: { menus = null, connect },
    title,
  } = settings;
  const socialLinks = links.filter((link) => link.platform === connect);

  return {
    logo: imageFromMedia({ alt: title, ...media }),
    menus,
    socialLinks,
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
    primaryMenus: primaryNavigation?.menus || null,
    secondaryMenus: secondaryNavigation?.menus || null,
  };
}
function getPageSlug({ params }) {
  const slugsCount = params?.slugs?.length;
  // count < 3, page slug is the last slug e.g. ["about"] or ["knowldge/news"]
  // count == 3, page slug is the 2nd slug (index 1); last slug (index 3)
  //             is the post. e.g. opportunities/grants/democratic-governance-in-zambia
  const pageSlugIndex = slugsCount < 3 ? slugsCount - 1 : 1;
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
  const { docs: pages } = await api.getCollection("pages");

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
  const { draftMode = false } = context;
  const slug = getPageSlug(context);
  const {
    docs: [page],
  } = await api.findPage(slug, {
    draft: draftMode,
  });

  if (!page) {
    if (["404", "500"].includes(slug)) {
      return getDefaultErrorPageProps(slug);
    }
    return null;
  }
  const siteSettings = await api.findGlobal("site-settings");
  const blocks = await blockify(page?.blocks, api, context);
  const navbar = getNavBar(siteSettings);
  const footer = getFooter(siteSettings);
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
