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

export async function getPageProps(api, slug) {
  const {
    docs: [page],
  } = await api.findPage(slug);
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
