import { payload } from "@/charterafrica/lib";

async function getGlobalProps({ locale, defaultLocale }) {
  const footer = await payload.findGlobal("footer", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { actions, menus } = await payload.findGlobal("navigation", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = await payload.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });

  const navbar = {
    actions,
    languages: languages ?? null,
    logo: {
      alt: "Charter Africa",
      src: "/images/charter-logo.svg",
      href: "/",
      priority: true,
    },
    menus: menus ?? null,
  };
  return { footer, navbar };
}

export default getGlobalProps;
