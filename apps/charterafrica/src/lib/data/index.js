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
    slug: "featured-post",
    id: 1,
    title: "News story title goes here and spans over second line. ",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur  ",
    date: "2023-02-11",
    image: {
      id: "63d2622aafe25f6469605eae",
      alt: `Featured News`,
      prefix: "media",
      filename: "Rectangle 113.jpg",
      mimeType: "image/jpg",
      filesize: 257010,
      width: 1236,
      height: 696,
      createdAt: "2023-01-26T11:21:14.868Z",
      updatedAt: "2023-01-26T11:21:14.868Z",
      url: "/images/featured_post.jpeg",
    },
    link: {
      href: "/research/1",
    },
  });

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
        url: "/images/Rectangle 113.jpg",
      },
    })),
  });
}

async function processPageResearch({ blocks }) {
  // TODO(kilemensi): Pull data from CMS

  blocks.push({
    slug: "featured-post",
    id: 1,
    title: "Featured Post title goes here and spans over second line. ",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur  ",
    author: "Sakwa G",
    date: "2023-02-11",
    image: {
      id: "63d2622aafe25f6469605eae",
      alt: `Featured Post`,
      prefix: "media",
      filename: "Rectangle 113.jpg",
      mimeType: "image/jpg",
      filesize: 257010,
      width: 1236,
      height: 696,
      createdAt: "2023-01-26T11:21:14.868Z",
      updatedAt: "2023-01-26T11:21:14.868Z",
      url: "/images/featured_post.jpeg",
    },
    link: {
      href: "/research/1",
    },
  });

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
        url: "/images/Rectangle 113.jpg",
      },
    })),
  });
}

async function processPageFellowships({ blocks }) {
  blocks.push({
    slug: "fellowships",
    title: "Grants and Fellowships",
    bannerText: "A list of all Charter Africa grants, fellowships and events",
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
    fellowships: Array.from({ length: 30 }, (_, i) => ({
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
      category: ["technologies", "other"][Math.floor(Math.random() * 2)],
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
    case "fellowships":
      processPageFellowships(page);
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
