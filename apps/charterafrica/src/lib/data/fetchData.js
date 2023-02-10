import fetchApi from "./fetchApi";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/${collection}`,
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

export const fetchFooter = async (args) => {
  return fetchGlobals("footer", args);
};

export const fetchNavigation = async (args) => {
  return fetchGlobals("navigation", args);
};

export const fetchSettings = async (args) => {
  return fetchGlobals("settings", args);
};

export const fetchErrorPages = async (args) => {
  return fetchCollection("errors", args);
};

export const fetchGlobalProps = async (args) => {
  const settings = await fetchSettings(args);
  const footer = await fetchFooter(args);
  const { languages } = settings;
  const { actions, menus } = await fetchNavigation(args);
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
