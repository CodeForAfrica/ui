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
    articles: Array(30)
      .fill()
      .map(() => ({
        title: "News story title goes here and spans over second line",
        author: "Sakwa G",
        date: "2023-02-11",
        id: Math.random(),
        image: {
          id: "63d2622aafe25f6469605eae",
          alt: "European Union",
          prefix: "media",
          filename: "image 9.png",
          mimeType: "image/png",
          filesize: 257010,
          width: 1236,
          height: 696,
          createdAt: "2023-01-26T11:21:14.868Z",
          updatedAt: "2023-01-26T11:21:14.868Z",
          url: "http://localhost:3000/media/Rectangle 113.png",
        },
      })),
  });
}

async function processPageResearch({ blocks }) {
  // TODO(kilemensi): Pull data from CMS
  blocks.push({
    slug: "research",
    title: "Research",
    articles: Array(30)
      .fill()
      .map(() => ({
        title: "Research title goes here and spans over second line",
        author: "Sakwa G",
        date: "2023-02-11",
        id: Math.random(),
        image: {
          id: "63d2622aafe25f6469605eae",
          alt: "European Union",
          prefix: "media",
          filename: "image 9.png",
          mimeType: "image/png",
          filesize: 257010,
          width: 1236,
          height: 696,
          createdAt: "2023-01-26T11:21:14.868Z",
          updatedAt: "2023-01-26T11:21:14.868Z",
          url: "http://localhost:3000/media/Rectangle 113.png",
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
