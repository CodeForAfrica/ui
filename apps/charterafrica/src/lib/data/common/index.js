import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";

async function getGlobalProps({ locale, defaultLocale }, api) {
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

export async function processPageAbout({ blocks }) {
  blocks.push({
    slug: "grantees",
    title: "Grantees",
    grantees: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      name: "Grantee Name ".repeat((i % 2) + 1).trim(),
      description: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet con sectetur adipiscing elit mi, interdum blandit fring illa fus. adipiscing elit mi, adipiscing.",
            },
          ],
        },
      ],
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `About ${i}`,
        prefix: "media",
        filename: "Rectangle 117.png",
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: "/images/Rectangle 117.png",
      },
      primaryLink: {
        label: "Constitutional changes of government",
        href: "/",
      },
      secondaryLink: {
        label: "Networks",
        href: "/",
      },
    })),
  });
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
    items: Array.from({ length: 30 }, (_, i) => ({
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
        url: "/images/charter-africa-brand.svg",
      },
      deadline: "2023-02-11",
      status: ["open", "closed", "upcoming"][Math.floor(Math.random() * 3)],
    })),
    config: {
      showAllText: "Show All",
      showLessText: "Show Less",
      deadlineText: "Deadline",
      showOnMobile: ["open", "closed"],
      statusGroupTitleSuffix: "Calls",
    },
  });
  blocks.push({
    slug: "fellowships",
    title: "Fellowships",
    items: Array.from({ length: 30 }, (_, i) => ({
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
        url: [
          "/images/fellowships.png",
          "/images/fellowships1.png",
          "/images/fellowships2.png",
          "/images/fellowships3.png",
        ][Math.floor(Math.random() * 4)],
      },
      deadline: "2023-02-11",
      status: ["technologies", "other"][Math.floor(Math.random() * 2)],
    })),
    config: {
      showAllText: "Show All",
      showLessText: "Show Less",
      deadlineText: "Deadline",
      showOnMobile: ["technologies"],
      statusGroupTitleSuffix: "",
    },
  });
}

export async function processPageNews(page, api) {
  const { blocks, breadcrumbs = [] } = page;
  const { docs } = await api.getCollection("news", {
    where: { _status: { equals: "published" } },
  });

  const processArticle = (data) => ({
    ...data,
    author: data?.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    image: data?.coverImage ?? null,
    date: new Date(data?.publishedOn).toUTCString(),
    link: {
      href: `${breadcrumbs[breadcrumbs.length - 1]?.url}/${data?.id}`,
    },
  });

  const articles = docs?.map(processArticle);
  const rawArticle =
    blocks.find(({ slug }) => slug === "featured-post")?.featuredPost?.value ??
    null;

  if (!rawArticle) {
    return;
  }

  const featuredNewsPost = processArticle(rawArticle);
  const featuredPost = {
    category: "News",
    ...featuredNewsPost,
    slug: "featured-post",
  };
  const news = {
    slug: "news",
    title: "News",
    articles,
  };
  blocks[0] = featuredPost;
  blocks[1] = news;
}

export async function processPageResearch({ blocks }) {
  // TODO(kilemensi): Pull data from CMS
  blocks.push({
    slug: "featured-post",
    category: "Research",
    title: "Research Story title goes here and spans over second line",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur",
    date: "2020-10-10 10:10:10",
    author: "Author",
    image: {
      url: "/images/featured_post.jpg",
      alt: "Featured Post",
    },
    link: {
      href: "/knowledge/news",
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
      author: "Author",
      date: "2023-02-11",
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Research ${i}`,
        prefix: "media",
        filename: `knowledge_${(i % 3) + 1}.jpg`,
        mimeType: "image/jpg",
        filesize: 257010,
        width: 1236,
        height: 696,
        createdAt: "2023-01-26T11:21:14.868Z",
        updatedAt: "2023-01-26T11:21:14.868Z",
        url: `/images/knowledge_${(i % 3) + 1}.jpg`,
      },
    })),
  });
}

const processPageFunctionsMap = {
  about: processPageAbout,
  explainers: processPageExplainers,
  news: processPageNews,
  research: processPageResearch,
  fellowships: processPageFellowships,
};

async function processGlobalBlockFocalCountries(block) {
  return block;
}

async function processGlobalBlockHelpdesk(block) {
  const { description, image, link, slug, title } = block || {};
  if (!title?.length) {
    return null;
  }

  const helpdesk = { slug, title };
  if (description?.length) {
    helpdesk.description = description;
  }
  if (image?.url?.length) {
    helpdesk.image = {
      url: image.url,
    };
    if (image.alt?.length) {
      helpdesk.image.alt = image.alt;
    }
  }
  if (link?.label?.length) {
    helpdesk.link = {
      label: link.label,
    };
    if (link.href?.length) {
      helpdesk.link.href = link.href;
    }
  }
  return helpdesk;
}

const processGlobalBlockFunctionsMap = {
  "focal-countries": processGlobalBlockFocalCountries,
  helpdesk: processGlobalBlockHelpdesk,
};

export async function getPageProps(context, api) {
  const { defaultLocale, locale, locales, params } = context;
  const fallbackLocale = defaultLocale;
  const slugsCount = params.slugs?.length;
  const slug = slugsCount ? params.slugs[slugsCount - 1] : "index";
  // NOTE: we don't use .join because it doesn't put separator first
  const pathname = slugsCount
    ? params.slugs.reduce((acc, curr) => `${acc}/${curr}`, "")
    : "/";

  const { docs: pages } = await api.findPage(slug, {
    locale,
    fallbackLocale,
  });
  if (!pages?.length) {
    return null;
  }

  const [page] = pages;
  page.blocks =
    (await Promise.all(
      page.blocks?.map(async ({ block, blockType, ...other }) => {
        if (blockType !== "global") {
          return {
            ...other,
            slug: blockType,
          };
        }
        if (block) {
          const foundBlock = await api.findGlobal(block, {
            locale,
            fallbackLocale,
          });
          if (foundBlock) {
            foundBlock.slug = block;
            const processGlobalBlock = processGlobalBlockFunctionsMap[block];
            return processGlobalBlock?.(foundBlock) ?? null;
          }
        }
        return null;
      })
    )) || [];
  const processPage = processPageFunctionsMap[page.slug];
  if (processPage) {
    await processPage(page, api);
  }
  const { settings, ...globalProps } = await getGlobalProps(
    { defaultLocale, locale },
    api
  );
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
