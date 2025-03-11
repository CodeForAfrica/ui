import { blockify } from "@/climatemappedafrica/lib/data/blockify";
import { fetchCachedProfile } from "@/climatemappedafrica/lib/hurumap";

export function imageFromMedia(media, options) {
  const alt = options?.alt || media.alt;
  const { height, url: src, width } = media;
  return { alt, height, src, width };
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

  return {
    connect,
    description,
    logo: imageFromMedia(media, { alt: title }),
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
    drawerLogo: imageFromMedia(drawerLogo, { alt: title }),
    explorePagePath,
    locations,
    logo: imageFromMedia(primaryLogo, { alt: title }),
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

  const pathPromises = pages.map(async ({ slug }) => {
    // TODO(kilemensi): Handle parent > child page relation e.g. /insights/news
    if (slug !== profilePage?.slug) {
      return [
        {
          params: {
            slugs: [slug === "index" ? "" : slug],
          },
        },
      ];
    }
    const { url: hurumapUrl, profile: profileId } = hurumapSettings;
    // HURUmap profile page
    const { locations } = await fetchCachedProfile({
      baseUrl: hurumapUrl,
      profileId,
    });
    const continents = locations.filter(
      (country) => country.level === "Continent", // Only build the top geography level
    );
    return continents?.map((c) => ({
      params: {
        slugs: [profilePage.slug, c.code],
      },
    }));
  });
  const resolvedPaths = await Promise.all(pathPromises);
  const paths = resolvedPaths.flat();

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
  const { analytics } = settings.site;
  const hurumapSettings = await api.findGlobal("settings-hurumap");
  if (hurumapSettings?.enabled) {
    // TODO(koech): Handle cases when fetching profile fails?
    const {
      url: hurumapUrl,
      page: hurumapPage,
      profile: profileId,
      ...otherHurumapSettings
    } = hurumapSettings;
    const profile = await fetchCachedProfile({
      baseUrl: hurumapUrl,
      profileId,
    });
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
      hurumapUrl,
      profile,
      profileId,
      profilePage,
    };
  }

  const blocks = await blockify(page, api, context, settings);
  const footer = getFooter(variant, settings);
  const menus = await getNavBar(variant, settings);

  return {
    analytics,
    blocks,
    footer,
    menus,
  };
}
