import payload from "@/codeforafrica/lib/payload";

async function getNavigation() {
  const {
    logo: {
      image: { alt, url },
    },
    menus,
  } = await payload.findGlobal("navigation");
  return {
    logo: {
      alt,
      src: url,
    },
    menu: menus?.map(({ label, href }) => ({ content: label, href })),
  };
}

export default getNavigation;
