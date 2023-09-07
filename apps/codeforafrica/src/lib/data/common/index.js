function getNavBar(settings) {
  const {
    logo: { coloured: image = {} },
    navigation: { primary: menus = [] },
    connect: { socialLinks = [] },
  } = settings;

  return {
    logo: {
      alt: image.alt || "Code for Africa",
      src: image.url ?? null,
    },
    menus: menus.map(({ label, href }) => ({ content: label, href })),
    socialLinks,
  };
}

function getFooter(settings) {
  const {
    logo: { blackAndWhite: logo = null },
    navigation: { primary: menus = [], secondary: secondaryMenu = [] },
    ...footer
  } = settings;
  return {
    ...footer,
    logo,
    menus,
    secondaryMenu,
  };
}
export async function getPageProps(api) {
  const settings = await api.findGlobal("settings");
  const navbar = getNavBar(settings);
  const footer = getFooter(settings);
  return {
    footer,
    navbar,
  };
}

export default getPageProps;
