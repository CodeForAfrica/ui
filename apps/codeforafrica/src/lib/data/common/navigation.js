async function getNavigation(api) {
  const navigation = await api.findGlobal("navigation");
  const {
    logo: { image },
    menus = [],
    socialLinks = [],
  } = navigation;

  return {
    logo: {
      alt: image?.alt || "Logo",
      src: image?.url || "/images/cfa-logo.svg",
    },
    menus: menus.map(({ label, href }) => ({ content: label, href })),
    socialLinks,
  };
}

export default getNavigation;
