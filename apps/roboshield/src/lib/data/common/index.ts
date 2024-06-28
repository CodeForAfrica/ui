import { Api, MediaData, Settings } from "../payload.types";
import { AppContext } from "next/app";

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

function getHero(settings: Settings) {
  const { heroButtonText, heroDescriptiveText, heroHeaders } = settings;
  return {
    heroHeaders,
    heroDescriptiveText,
    heroButtonText,
  };
}

export async function getPageProps(api: Api, context: AppContext) {
  const siteSettings: Settings = (await api.findGlobal(
    "settings-site",
  )) as Settings;
  const navbar = getNavBar(siteSettings);
  const hero = getHero(siteSettings);
  const footer = getFooter(siteSettings);
  return {
    hero,
    footer,
    navbar,
  };
}

export default getPageProps;
