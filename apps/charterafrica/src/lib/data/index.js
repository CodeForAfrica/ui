import { getPageSeoFromMeta } from "./seo";

import { payload } from "@/charterafrica/lib";

export async function getGlobalProps({ locale, defaultLocale }) {
  const settings = await payload.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = settings;
  const { actions, menus } = await payload.findGlobal("navigation", {
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
  const footer = await payload.findGlobal("footer", {
    locale,
    fallbackLocale: defaultLocale,
  });

  return { footer, navbar, settings };
}

async function processPageExplainers({ title, blocks }) {
  const collection = await payload.getCollection("explainers");
  const explainers = collection.docs || null;

  if (explainers?.length) {
    blocks.push({
      slug: "explainers",
      title,
      explainers,
    });
  }
}

async function processPageNews({ blocks }) {
  // TODO(kilemensi): Pull data from CMS
  blocks.push({
    slug: "news",
    title: "News",
    articles: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "News story title goes here and spans over second line. "
        .repeat((i % 2) + 1)
        .trim(),
      author: "Sakwa G",
      date: "2023-02-11",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `News Story ${i}`,
        prefix: "media",
        filename: "Rectangle 113.jpg",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "http://localhost:3000/images/Rectangle 113.jpg",
      },
    })),
  });
}

async function processPageResearch({ blocks }) {
  // TODO(kilemensi): Pull data from CMS
  blocks.push({
    slug: "research",
    title: "Research",
    articles: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "Research title goes here and spans over second line. "
        .repeat((i % 2) + 1)
        .trim(),
      author: "Sakwa G",
      date: "2023-02-11",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Research ${i}`,
        prefix: "media",
        filename: "Rectangle 113.jpg",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "http://localhost:3000/images/Rectangle 113.jpg",
      },
    })),
  });
}

async function processPageSpecificBlocks(page) {
  switch (page.slug) {
    case "explainers":
      processPageExplainers(page);
      break;
    case "news":
      processPageNews(page);
      break;
    case "research":
      processPageResearch(page);
      break;
    default:
      break;
  }
}

export async function getPageServerSideProps({
  defaultLocale,
  query,
  resolvedUrl,
  locale,
  locales,
}) {
  const { slug } = query;
  const { docs: pages } = await payload.findPage(slug, {
    locale,
    fallbackLocale: defaultLocale,
  });
  if (!pages?.length) {
    return { notFound: true };
  }

  const [page] = pages;
  page.blocks =
    page.blocks?.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    })) ?? [];
  processPageSpecificBlocks(page);
  const { settings, ...globalProps } = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  const seo = getPageSeoFromMeta(page, settings, {
    locale,
    locales,
    pathname: resolvedUrl,
  });
  return {
    props: {
      ...globalProps,
      ...page,
      seo,
    },
  };
}

export const loginToPayload = async () => {
  const email = process.env.NEXT_PUBLIC_APP_AUTH_EMAIL;
  const password = process.env.NEXT_PUBLIC_APP_AUTH_PASSWORD;
  const data = { email, password };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const response = await res.json();
  return response;
};

export const fetchGlobals = async (collection, { defaultLocale, locale }) => {
  const { token } = await loginToPayload();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/globals/${collection}?locale=${locale}&fallback-locale=${defaultLocale}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `payload-token=${token}`,
      },
    }
  );
  const response = await res.json();
  return response;
};

export const fetchCollection = async (
  collection,
  { defaultLocale, locale }
) => {
  const { token } = await loginToPayload();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/${collection}?locale=${locale}&fallback-locale=${defaultLocale}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `payload-token=${token}`,
      },
    }
  );
  const response = await res.json();
  return response;
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
