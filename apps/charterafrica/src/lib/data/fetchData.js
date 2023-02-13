import fetchApi from "./fetchApi";

const BASE_URL = process.env.PAYLOAD_PUBLIC_APP_URL;
export const fetchGlobals = async (collection, { defaultLocale, locale }) => {
  const params = { locale, "fallback-locale": defaultLocale };
  const res = await fetchApi.get(`${BASE_URL}/api/globals/${collection}`, {
    params,
  });
  return res;
};

export const fetchCollection = async (
  collection,
  { defaultLocale, locale, ...rest }
) => {
  const params = { locale, "fallback-locale": defaultLocale, ...rest };
  const res = await fetchApi.get(
    `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/${collection}`,
    { params }
  );
  return res;
};

export const fetchPage = async (slug, args) => {
  const params = {
    ...args,
    where: {
      slug: {
        equals: slug,
      },
    },
  };
  const res = await fetchCollection("pages", params);
  return res;
};

export const fetchGlobalProps = async (args) => {
  const settings = await fetchGlobals("settings", args);
  const footer = await fetchGlobals("footer", args);
  const { languages } = settings;
  const { actions, menus } = await fetchGlobals("navigation", args);
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
  return { settings, footer, navbar };
};
