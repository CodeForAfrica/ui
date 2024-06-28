import { Api, MediaData, Settings } from "../payload.types";
import { AppContext } from "next/app";
import { blockify } from "../blockify";

export function imageFromMedia({ alt = null, url = null }: Partial<MediaData>) {
  return { alt, src: url };
}

function getNavBar(settings: Settings) {
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

function getFooter(settings: Settings) {
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

function getPageSlug({ params }: { params?: { slugs: string[] } }) {
  const slugsCount = params?.slugs?.length ?? 0;
  const pageSlugIndex = slugsCount < 3 ? slugsCount - 1 : 1;
  return params?.slugs?.[pageSlugIndex] || "index";
}

export async function getPageProps(
  api: Api,
  context: AppContext["ctx"] & { params?: { slugs: string[] } },
) {
  const siteSettings: Settings = (await api.findGlobal(
    "settings-site",
  )) as Settings;
  const { defaultLocale, locale, params } = context;
  const fallbackLocale = defaultLocale;
  const slug = getPageSlug(context);
  const pathname = slug !== "index" ? `/${params?.slugs?.join("/")}` : "/";

  const { docs: pages } = await api.findPage(slug, {
    locale,
    fallbackLocale,
  });
  if (!pages?.length) {
    return null;
  }

  const [page] = pages;
  const blocks = await blockify(page.blocks, api);
  const navbar = getNavBar(siteSettings);
  const footer = getFooter(siteSettings);
  return {
    blocks,
    footer,
    navbar,
  };
}

export default getPageProps;
