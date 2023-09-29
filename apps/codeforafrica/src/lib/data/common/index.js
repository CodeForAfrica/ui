import blockify from "@/codeforafrica/lib/data/blockify";
import pagify from "@/codeforafrica/lib/data/pagify";
import getPageSeoFromMeta from "@/codeforafrica/lib/data/seo";
import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function getNavBar(settings) {
  const {
    connect: { links: socialLinks = [] },
    primaryLogo: media,
    primaryNavigation,
    title,
  } = settings;

  return {
    logo: imageFromMedia({ alt: title, ...media }),
    menus: primaryNavigation?.menus || null,
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
  const media = secondaryLogo || primaryLogo;

  return {
    ...footer,
    logo: imageFromMedia({ alt: title, ...media }),
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
      title: "Server Error. ",
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
    };
  }

  return {
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
  };
}

export async function getPageProps(api, context) {
  const { params } = context;
  const slug = getPageSlug(context);
  let {
    docs: [page],
  } = await api.findPage(slug);
  if (!page) {
    if (["404", "500"].includes(slug)) {
      return getDefaultErrorPageProps(slug);
    }
    return null;
  }
  if (params?.slugs?.length > 2) {
    page = await pagify(page, api, context);
    if (!page) {
      return null;
    }
  }
  const blocks = await blockify(page?.blocks ?? null, api, context);
  const settings = await api.findGlobal("settings");
  const navbar = getNavBar(settings);
  const footer = getFooter(settings);

  const seo = getPageSeoFromMeta(page, settings);
  return {
    blocks,
    footer,
    navbar,
    seo,
  };
}

export default getPageProps;
