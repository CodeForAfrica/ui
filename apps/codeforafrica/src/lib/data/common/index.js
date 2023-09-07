function getNavBar(globals) {
  const {
    logo: { coloured: image = {} },
    menus = [],
    connect: { socialLinks = [] },
  } = globals;

  return {
    logo: {
      alt: image.alt || "Code for Africa",
      src: image.url,
    },
    menus: menus.map(({ label, href }) => ({ content: label, href })),
    socialLinks,
  };
}

function getFooter(globals) {
  const {
    logo: { blackAndWhite: logo },
    ...footer
  } = globals;
  return {
    logo,
    ...footer,
  };
}
export async function getPageProps(api) {
  const globals = await api.findGlobal("header-and-footer");
  const navbar = getNavBar(globals);
  const footer = getFooter(globals);
  return {
    footer,
    navbar,
  };
}

export default getPageProps;
