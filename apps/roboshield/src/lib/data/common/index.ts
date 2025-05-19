import { GetServerSidePropsContext } from "next";

import { blockify } from "@/roboshield/lib/data/blockify";
import getPageSeoFromMeta from "@/roboshield/lib/data/seo";
import { Api } from "@/roboshield/lib/payload";
import site from "@/roboshield/utils/site";
import type { SettingsSite } from "@/root/payload-types";

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
  // For now, RoboShield only supports single paths i.e. /, /about, etc.,
  // so params.slug[0] is good enough
  const slugs = context.params?.slug as string[] | undefined;
  const [slug] = slugs || ["index"];
  const { draftMode = false } = context;
  const options = { draft: draftMode };
  const {
    docs: [page],
  } = await api.findPage(slug, options);

  if (!page) {
    return null;
  }

  // NOTE(kilemensi): handle locale if/when used
  const pagePath = slugs?.join("/") ?? "";
  // remove any trailing '/'
  const pageUrl = `${site.environmentUrl}${pagePath}`.replace(/\/+$/, "");
  page.meta = {
    canonical: pageUrl,
    ...page.meta,
  } as Record<string, any>;

  const blocks = await blockify(page.blocks, api);

  const siteSettings = await api.findGlobal("settings-site");
  const { analytics } = siteSettings;
  const footer = getFooter(siteSettings);
  const navbar = getNavBar(siteSettings);
  const seo = getPageSeoFromMeta(page, siteSettings);

  return {
    analytics,
    blocks,
    footer,
    navbar,
    seo,
    slug,
  };
}

export default getPageProps;
