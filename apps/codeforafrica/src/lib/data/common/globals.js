export async function getNavigation(api) {
  const navigation = await api.findGlobal("navigation");
  const {
    logo: { image },
    menus = [],
    socialLinks = [],
  } = navigation;

  return {
    logo: {
      alt: image.alt || "Code for Africa",
      src: image.url,
    },
    menus: menus.map(({ label, href }) => ({ content: label, href })),
    socialLinks,
  };
}

export async function getFooter(api) {
  return api.findGlobal("footer");
}
