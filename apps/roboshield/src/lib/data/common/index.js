export function imageFromMedia({ alt = null, url = null }) {
  return { alt, src: url };
}

function getNavBar(settings) {
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

export async function getPageProps(api, context) {
  const siteSettings = await api.findGlobal("settings-site");
  const navbar = getNavBar(siteSettings);
  const footer = getFooter(siteSettings);

  return {
    blocks: [],
    footer,
    navbar,
  };
}

export default getPageProps;
