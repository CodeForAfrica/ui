import blockify from "@/codeforafrica/lib/data/blockify";
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

function getDefaultErrorPageProps() {
  return {
    title: "Page not found. ",
    subtitle: [
      {
        children: [
          {
            text: "Visit our ",
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
        ],
      },
    ],
  };
}

export async function getPageProps(api, context) {
  const slug = getPageSlug(context);
  const {
    docs: [page],
  } = await api.findPage(slug);
  if (!page && (slug === "404" || slug === "500")) {
    return getDefaultErrorPageProps();
  }
  if (!page) {
    return null;
  }

  const settings = await api.findGlobal("settings");
  const navbar = getNavBar(settings);
  const footer = getFooter(settings);
  const blocks = await blockify(page.blocks);

  return {
    blocks,
    footer,
    navbar,
  };
}

export default getPageProps;
