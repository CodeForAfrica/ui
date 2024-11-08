import { blockify } from "@/climatemappedafrica/lib/data/blockify";
import { fetchProfile } from "@/climatemappedafrica/lib/hurumap";

// TODO(kilemensi): Use HURUmap APIs (or CMS) to pick geographies we'd like to
//                  build pages for at build time (It can't be all geographies
//                  as that will take forever)
const GEOGRAPHIES = ["af", "ke", "tz"];

export function imageFromMedia(alt, url) {
  return { alt, src: url };
}

function getFooter(variant, settings) {
  const {
    connect,
    footerNavigation,
    newsletter,
    primaryLogo,
    secondaryLogo,
    description,
    title,
  } = settings.site;
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

async function getNavBar(variant, settings) {
  const { hurumap, site } = settings;
  const {
    connect: { links = [] },
    drawerLogo,
    primaryLogo,
    primaryNavigation: { menus = [], connect = [] },
    title,
  } = site;
  const socialLinks = links?.filter((link) => connect.includes(link.platform));
  let explorePagePath = null;
  let locations = null;
  let tutorialEnabled;
  if (hurumap?.enabled) {
    explorePagePath = hurumap.profilePage.slug;
    if (hurumap.profile) {
      locations = hurumap.profile.locations;
    }
    tutorialEnabled = hurumap.tutorial?.enabled;
  }

  return {
    drawerLogo: imageFromMedia(title, drawerLogo.url),
    explorePagePath,
    locations,
    logo: imageFromMedia(title, primaryLogo.url),
    menus,
    socialLinks,
    tutorialEnabled,
    variant,
  };
}

export async function getPagePaths(api) {
  const hurumapSettings = await api.findGlobal("settings-hurumap");
  let profilePage;
  if (hurumapSettings?.enabled) {
    profilePage = hurumapSettings.page.value;
  }
  const { docs: pages } = await api.getCollection("pages");
  const paths = pages.flatMap(({ slug }) => {
    // TODO(kilemensi): Handle parent > child page relation e.g. /insights/news
    if (slug !== profilePage?.slug) {
      return {
        params: {
          slugs: [slug === "index" ? "" : slug],
        },
      };
    }
    // HURUmap profile page
    return GEOGRAPHIES.map((code) => ({
      params: {
        slugs: [profilePage.slug, code],
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

  const {
    docs: [page],
  } = await api.findPage(slug, options);
  if (!page) {
    return null;
  }

  let variant = "default";
  const settings = {};
  settings.site = (await api.findGlobal("settings-site")) || null;
  const hurumapSettings = await api.findGlobal("settings-hurumap");
  if (hurumapSettings?.enabled) {
    // TODO(koech): Handle cases when fetching profile fails?
    const {
      hurumapAPIURL,
      page: hurumapPage,
      profile: profileId,
      ...otherHurumapSettings
    } = hurumapSettings;
    const profile = await fetchProfile({ BASE_URL: hurumapAPIURL, profileId });
    const { value: profilePage } = hurumapPage;
    if (slug === profilePage.slug) {
      variant = "explore";
      const explorePageBlock = {
        blockType: "explore-page",
        slugs: slugs.slice(1),
      };
      page.blocks.push(explorePageBlock);
      if (hurumapSettings.tutorial?.enabled) {
        const tutorialBlock = { blockType: "tutorial" };
        page.blocks.push(tutorialBlock);
      }
    }
    settings.hurumap = {
      ...otherHurumapSettings,
      hurumapAPIURL,
      profile,
      profileId,
      profilePage,
    };
  }

  const blocks = await blockify(page, api, context, settings);
  const footer = getFooter(variant, settings);
  const menus = await getNavBar(variant, settings);

  return {
    blocks,
    footer,
    menus,
  };
}
