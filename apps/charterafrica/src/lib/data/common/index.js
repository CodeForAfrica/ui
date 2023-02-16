import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";

async function getGlobalProps(api, { locale, defaultLocale }) {
  const settings = await api.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = settings;
  const { actions, menus } = await api.findGlobal("navigation", {
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
  const footer = await api.findGlobal("footer", {
    locale,
    fallbackLocale: defaultLocale,
  });

  return { footer, navbar, settings };
}

export async function processPageExplainers({ title, blocks }, api) {
  const collection = await api.getCollection("explainers");
  const explainers = collection.docs || null;

  if (explainers?.length) {
    blocks.push({
      slug: "explainers",
      title,
      explainers,
    });
  }
}

export async function processPageFellowships({ blocks }) {
  blocks.push({
    slug: "page-info",
    description: [
      {
        children: [
          {
            text: "A list of all Charter Africa grants, fellowships and events",
          },
        ],
      },
    ],
  });
  blocks.push({
    slug: "fellowships-and-grants-header",
    title: "Grants and Fellowships",
  });
  blocks.push({
    slug: "grants",
    title: "Grants",
    grants: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Grant ${i}`,
        prefix: "media",
        filename: "Rectangle 113.jpg",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "/images/the-charter-project-africa_brandguide_guidedemarque-2-2.jpg",
      },
      deadline: "2023-02-11",
      status: ["open", "closed", "upcoming"][Math.floor(Math.random() * 3)],
    })),
  });
  blocks.push({
    slug: "fellowships",
    title: "Fellowships",
    grants: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Grant ${i}`,
        prefix: "media",
        filename: "Rectangle 113.jpg",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "/images/fellowships.png",
      },
      deadline: "2023-02-11",
      status: ["technologies", "other"][Math.floor(Math.random() * 2)],
    })),
  });
}

export async function processPageNews({ blocks }) {
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

export async function processPageResearch({ blocks }) {
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

export async function processPageSpecificBlocks(page) {
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
    case "fellowships":
      processPageFellowships(page);
      break;
    default:
      break;
  }
}

export async function getPageProps(
  slug,
  api,
  { defaultLocale, locale, locales, pathname } = {}
) {
  const { docs: pages } = await api.findPage(slug, {
    locale,
    fallbackLocale: defaultLocale,
  });
  if (!pages?.length) {
    return null;
  }

  const [page] = pages;
  page.blocks =
    page.blocks?.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    })) ?? null;
  processPageSpecificBlocks(page);
  const { settings, ...globalProps } = await getGlobalProps(api, {
    defaultLocale,
    locale,
  });
  const seo = getPageSeoFromMeta(page, settings, {
    locale,
    locales,
    pathname,
  });
  return {
    ...globalProps,
    ...page,
    seo,
  };
}
