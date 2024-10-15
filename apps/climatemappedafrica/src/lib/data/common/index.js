import { blockify } from "@/climatemappedafrica/lib/data/blockify";

export function imageFromMedia(alt, url) {
  return { alt, src: url };
}

function getFooter(siteSettings) {
  const {
    connect,
    footerNavigation,
    newsletter,
    primaryLogo,
    secondaryLogo,
    description,
    title,
  } = siteSettings;

  const { menus: footerMenus, ...footerProps } = footerNavigation;

  const media = secondaryLogo || primaryLogo;
  const footerLogoUrl = typeof media === "string" ? null : media.url;

  return {
    connect,
    description,
    logo: imageFromMedia(title, footerLogoUrl),
    links: {
      ...footerProps,
      links: footerMenus,
    },
    newsletter,
    title,
  };
}

export async function getPageProps(api, context) {
  // For now, ClimatemappedAfrica only supports single paths i.e. /, /about, etc.,
  // so params.slug[0] is good enough
  const slugs = context.params?.slug || undefined;
  const [slug] = slugs || ["index"];
  const { draftMode = false } = context;
  const options = { draft: draftMode };

  const {
    docs: [page],
  } = await api.findPage(slug, options);

  if (!page) {
    return null;
  }

  const blocks = await blockify(page.blocks, api, context);

  const siteSettings = await api.findGlobal("settings-site");
  const footer = getFooter(siteSettings);

  return {
    blocks,
    footer,
  };
}
