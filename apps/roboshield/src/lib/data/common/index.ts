import { blockify } from "../blockify";
import { GetServerSidePropsContext } from "next";
import { Api } from "../../payload";
import { SettingsSite } from "../../../../payload-types";

export function imageFromMedia(alt: string, url: string) {
  return { alt, src: url };
}

function getNavBar(settings: SettingsSite) {
  const {
    connect: { links = [] },
    primaryLogo,
    primaryNavigation,
    title,
  } = settings;
  const menus = primaryNavigation?.menus;
  const connect = primaryNavigation?.connect;
  const socialLinks = links?.filter((link) => link.platform === connect);
  const primaryLogoUrl =
    typeof primaryLogo === "string" ? null : primaryLogo.url;
  return {
    logo: imageFromMedia(title, primaryLogoUrl || ""),
    menus,
    socialLinks,
  };
}

function getFooter(settings: SettingsSite) {
  const {
    primaryLogo,
    primaryNavigation,
    secondaryLogo,
    secondaryNavigation,
    title,
    ...footer
  } = settings;
  const media = secondaryLogo || primaryLogo;
  const footerLogoUrl = typeof media === "string" ? null : media.url;

  return {
    ...footer,
    logo: imageFromMedia(title, footerLogoUrl || ""),
    primaryMenus: primaryNavigation?.menus || null,
    secondaryMenus: secondaryNavigation?.menus || null,
  };
}

export async function getPageProps(
  api: Api,
  context: GetServerSidePropsContext,
) {
  const { resolvedUrl } = context;
  const path = resolvedUrl.replace(/^\//, "");
  const {
    docs: [page],
  } = await api.findPage(path);

  if (!page) {
    return null;
  }

  const blocks = await blockify(page.blocks, api);

  const siteSettings = await api.findGlobal("settings-site");
  const navbar = getNavBar(siteSettings);
  const footer = getFooter(siteSettings);

  return {
    blocks,
    footer,
    navbar,
  };
}

export default getPageProps;
