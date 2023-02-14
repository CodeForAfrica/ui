import fetchApi from "./fetchApi";

const BASE_URL = process.env.PAYLOAD_PUBLIC_APP_URL;
export const fetchGlobal = async (collection, { defaultLocale, locale }) => {
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

export async function fetchGlobalProps({ locale, defaultLocale }) {
  const settings = await fetchGlobal("settings", {
    locale,
    defaultLocale,
  });
  const { languages } = settings;
  const { actions, menus } = await fetchGlobal("navigation", {
    locale,
    defaultLocale,
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
  const footer = await fetchGlobal("footer", {
    locale,
    defaultLocale,
  });

  return { footer, navbar, settings };
}

export const process404Page = (docs) => {
  if (!docs.length) {
    throw new Error("Not found");
  }
  const [{ blocks, slug }] = docs;
  if (!blocks.length) {
    throw new Error("Not found");
  }
  const data = blocks.find(({ statusCode }) => statusCode === 404);
  return {
    slug,
    link: {},
    ...data,
  };
};
// TODO Cannot process in common because of payload import
export const processErrorPage = (docs, code) => {
  if (code === 404) {
    return process404Page(docs);
  }
  if (!docs.length) {
    return { notFound: true };
  }
  const [{ blocks, slug }] = docs;
  if (!blocks.length) {
    return { notFound: true };
  }
  const data = blocks.find(({ statusCode }) => statusCode === code);
  if (!data) {
    return { notFound: true };
  }
  return {
    slug,
    link: {},
    ...data,
  };
};

export const getPageStaticProps = async ({ query, ...args }) => {
  const { slug, statusCode } = query;
  const { docs } = await fetchPage(slug, args);
  const blocks = [];
  if (slug === "error") {
    const { notFound, ...block } = processErrorPage(docs, statusCode);
    if (notFound) {
      return { notFound };
    }
    blocks.push(block);
  }
  const { footer, navbar } = await fetchGlobalProps(args);
  return { props: { footer, navbar, blocks } };
};
