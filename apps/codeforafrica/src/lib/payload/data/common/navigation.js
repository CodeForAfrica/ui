async function getNavigation(api) {
  const {
    logo: {
      image: { alt, url },
    },
    menus,
  } = await api.findGlobal("navigation");
  return {
    logo: {
      alt,
      src: url,
    },
    menu: menus?.map(({ label, href }) => ({ content: label, href })),
  };
}

export default getNavigation;
