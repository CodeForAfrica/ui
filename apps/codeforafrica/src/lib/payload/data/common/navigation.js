async function getNavigation(api) {
  const navigation = await api.findGlobal("navigation");
  const {
    logo: { image },
    menus = [],
  } = navigation;

  return {
    logo: {
      alt: image?.alt || "Logo",
      src: image?.url || "/images/cfa-logo.svg",
    },
    menu: menus?.map(({ label, href }) => ({ content: label, href })),
  };
}

export default getNavigation;
