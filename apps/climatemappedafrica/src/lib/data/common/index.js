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

function getNavBar(variant, settings) {
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
    const topLevels = locations.filter(
      (topLevel) =>
        topLevel.level === "Continent" || topLevel.level === "Country",
    );
    return topLevels?.map((l) => ({
      params: {
        slugs: [profilePage.slug, l.code],
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

const errorConfigs = {
  500: {
    title: "Server Error.",
    statusCode: 500,
    descriptionText: "Server encountered an unexpected error.",
  },
  404: {
    title: "Not Found.",
    statusCode: 404,
    descriptionText: "Resource not found.",
  },
};

function getDefaultErrorPageProps(slug, variant, settings) {
  const config = errorConfigs[slug] || errorConfigs[404];
  const footer = getFooter(variant, settings);
  const menus = getNavBar(variant, settings);
  return {
    blocks: [
      {
        ...config,
        description: [
          {
            children: [
              {
                text: config.descriptionText,
                children: null,
              },
            ],
          },
        ],
        link: {
          label: "Go Home",
          href: "/",
        },
        slug: "error",
      },
    ],
    footer,
    menus,
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

  if (!page) {
    if (["404", "500"].includes(slug)) {
      return getDefaultErrorPageProps(slug, variant, settings);
    }
    return null;
  }

  const blocks = await blockify(page, api, context, settings);
  const footer = getFooter(variant, settings);
  const menus = getNavBar(variant, settings);

  return {
    analytics,
    blocks,
    footer,
    menus,
  };
}
