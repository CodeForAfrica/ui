import { blockify } from "@/climatemappedafrica/lib/data/blockify";
import { fetchProfile } from "@/climatemappedafrica/lib/hurumap";

// TODO(kilemensi): Use HURUmap APIs (or CMS) to pick geographies we'd like to
//                  build pages for at build time (It can't be all geographies
//                  as that will take forever)
const GEOGRAPHIES = ["af", "ke", "tz"];

export function imageFromMedia(alt, url) {
  return { alt, src: url };
}

function getFooter(siteSettings, variant) {
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
    variant,
  };
}

async function getNavBar(siteSettings, variant, { slug }, hurumapProfile) {
  const { locations } = hurumapProfile;
  const {
    connect: { links = [] },
    primaryNavigation: { menus = [], connect = [] },
    primaryLogo,
    drawerLogo,
    title,
  } = siteSettings;
  const socialLinks = links?.filter((link) => connect.includes(link.platform));

  return {
    logo: imageFromMedia(title, primaryLogo.url),
    drawerLogo: imageFromMedia(title, drawerLogo.url),
    explorePagePath: slug,
    menus,
    socialLinks,
    variant,
    locations,
  };
}

export async function getPagePaths(api) {
  const hurumapSettings = await api.findGlobal("settings-hurumap");
  const { docs: pages } = await api.getCollection("pages");
  let explorePage;
  if (hurumapSettings.page) {
    explorePage = hurumapSettings.page.value;
  } else {
    explorePage = null;
  }
  const paths = pages.flatMap(({ slug }) => {
    // TODO(kilemensi): Handle parent > child page relation e.g. /insights/news
    if (slug !== explorePage?.slug) {
      return {
        params: {
          slugs: [slug === "index" ? "" : slug],
        },
      };
    }
    // HURUmap profile page
    return GEOGRAPHIES.map((code) => ({
      params: {
        slugs: [explorePage.slug, code],
      },
    }));
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getPageProps(api, context) {
  // For now, ClimateMappedAfrica only supports single paths i.e. /, /about, etc.,
  // so params.slugs[0] is good enough
  const slugs = context.params?.slugs || undefined;
  const [slug] = slugs || ["index"];
  const { draftMode = false } = context;
  const options = { draft: draftMode };

  const hurumapProfile = await fetchProfile();

  const {
    docs: [page],
  } = await api.findPage(slug, options);

  if (!page) {
    return null;
  }

  const hurumap = await api.findGlobal("settings-hurumap");
  const {
    page: { value: explorePage },
  } = hurumap;
  const siteSettings = await api.findGlobal("settings-site");

  const settings = {
    hurumap,
    hurumapProfile,
    siteSettings,
  };

  let blocks = await blockify(page.blocks, api, context, settings);
  const variant = page.slug === explorePage.slug ? "explore" : "default";

  const footer = getFooter(siteSettings, variant);
  const menus = await getNavBar(
    siteSettings,
    variant,
    explorePage,
    hurumapProfile,
  );

  if (slug === explorePage.slug) {
    // The explore page is a special case. The only block we need to render is map and tutorial.
    const explorePageBlocks = [
      {
        blockType: "explore-page",
        slugs: slugs.slice(1),
      },
      {
        blockType: "tutorial",
      },
    ];
    blocks = await blockify(explorePageBlocks, api, context, settings);
  }

  return {
    blocks,
    footer,
    menus,
  };
}
