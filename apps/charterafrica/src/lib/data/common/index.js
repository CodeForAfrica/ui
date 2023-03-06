import { deepmerge } from "@mui/utils";

import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";
import useArticlesStore from "@/charterafrica/store/articlesStore";

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

async function processPageAbout(page) {
  const { blocks } = page;
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

  return page;
}

async function processPageExplainers(page, api) {
  const collection = await api.getCollection("explainers");
  const explainers = collection.docs || null;
  const { title, blocks } = page;
  if (explainers?.length) {
    blocks.push({
      slug: "explainers",
      title,
      explainers,
    });
  }

  return page;
}

async function processPageFellowships(page) {
  const { blocks } = page;
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
      date: "2023-02-11",
      excerpt: [
        {
          children: [
            {
              text: "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
            },
          ],
        },
      ],
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
      link: {
        href: `/`,
      },
      status: ["open", "closed", "upcoming"][Math.floor(Math.random() * 3)],
    })),
    config: {
      showAllText: "Show All",
      showLessText: "Show Less",
      dateText: "Deadline",
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
      date: "2023-02-11",
      excerpt: [
        {
          children: [
            {
              text: "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
            },
          ],
        },
      ],
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
      link: {
        href: `/fellowship/${i}`,
      },
      status: ["technologies", "other"][Math.floor(Math.random() * 2)],
    })),
    config: {
      showAllText: "Show All",
      showLessText: "Show Less",
      dateText: "Deadline",
      showOnMobile: ["technologies"],
      statusGroupTitleSuffix: "",
    },
  });
  blocks.push({
    slug: "events",
    title: "Events",
    items: Array.from({ length: 30 }, (_, i) => ({
      id: i,
      title: "Event title going on two or even three lines",
      category: "Topic Name",
      date: "2023-02-11",
      excerpt: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur ",
            },
          ],
        },
      ],
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
        url: "/images/featured-event.svg",
      },
      link: {
        href: `/events/${i}`,
      },
      registerLink: {
        href: `/register/events/${i}`,
      },
      registerText: "Register ",
      status: ["upcoming", "past"][Math.floor(Math.random() * 2)],
      featured: i === 0,
    })),
    config: {
      showAllText: "Show All",
      showLessText: "Show Less",
      showOnMobile: ["upcoming", "past"],
      statusGroupTitleSuffix: "",
    },
  });

  return page;
}

function processPost(post, page, api, context) {
  const { breadcrumbs = [] } = page;

  let image = null;
  if (post.coverImage) {
    const { alt, url } = post.coverImage;
    image = {
      alt: alt || post.title,
      url,
    };
  }
  let href = null;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  if (pageUrl) {
    const { slug } = post;
    href = `${pageUrl}/${slug}`;
  }
  const { locale } = context;
  return {
    ...post,
    author: post.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    image,
    date: new Date(post.publishedOn).toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "2-digit",
    }),
    link: {
      href,
    },
  };
}

async function processPageArticlePost(page, api, context) {
  const { params } = context;
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection(collection, {
    where: {
      slug: {
        equals: slug,
      },
      _status: { equals: "published" },
    },
  });
  if (!docs?.length) {
    return null;
  }

  const [post] = docs;
  const processedPost = processPost(docs[0], page, api, context);
  let content = null;
  if (post.content?.length) {
    content = post.content.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    }));
  }
  return {
    ...page,
    meta: deepmerge(page.meta, post.meta),
    title: `${post.title} | ${page.title}`,
    blocks: [
      {
        ...processedPost,
        slug: "post",
      },
      {
        content,
        slug: "longform",
      },
    ],
  };
}

async function processPageArticles(page, api, context) {
  const { params, query } = context;

  if (params.slugs.length > 2) {
    return processPageArticlePost(page, api, context);
  }

  const { blocks } = page;
  const foundIndex = blocks.findIndex(({ slug }) => slug === "featured-post");
  if (foundIndex > -1) {
    const foundValue = blocks[foundIndex].featuredPost?.value;
    if (foundValue) {
      blocks[foundIndex] = {
        ...processPost(foundValue, page, api, context),
        slug: "featured-post",
      };
    }
  }
  const { slug, title } = page;
  const { tag, sort: sorting } = query;
  const { docs } = await api.getCollection(slug, {
    where: {
      _status: { equals: "published" },
      "tags.name": {
        like: tag || "",
      },
    },
    sort: sorting === "oldest" ? "publishedOn" : "-publishedOn",
  });
  const articles =
    docs?.map((post) => processPost(post, page, api, context)) ?? null;

  if (!tag) {
    const allTags =
      articles
        ?.map(({ tags }) => {
          return tags?.map(({ name }) => name);
        })
        ?.flat()
        ?.sort((a, b) => a.localeCompare(b)) ?? [];
    useArticlesStore.getState().setTags(allTags);
  }
  useArticlesStore.getState().setArticles(articles);

  const { tags } = useArticlesStore.getState();

  const articlesBlock = {
    articles,
    slug,
    title,
  };
  blocks.push(articlesBlock);
  blocks.unshift({
    slug: "article-filter",
    tags: [...new Set(tags)],
    sorting: ["Most Recent", "Oldest"],
  });

  return page;
}

async function processPagePrivacyPolicy(page) {
  const { blocks } = page;
  const index = blocks?.findIndex(({ slug }) => slug === "longform");
  if (index > -1) {
    const { content: originalContent } = blocks[index];
    if (originalContent?.length) {
      const content = originalContent.map(({ blockType, ...other }) => ({
        ...other,
        slug: blockType,
      }));
      blocks[index].content = content;
    }
  }
  return page;
}

const processPageFunctionsMap = {
  about: processPageAbout,
  explainers: processPageExplainers,
  fellowships: processPageFellowships,
  news: processPageArticles,
  research: processPageArticles,
  "privacy-policy": processPagePrivacyPolicy,
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

function getPageSlug({ params }) {
  const slugsCount = params.slugs?.length;
  // count < 3, page slug is the last slug e.g. ["about"] or ["knowldge/news"]
  // count == 3, page slug is the 2nd slug (index 1); last slug (index 3)
  //             is the post. e.g. opportunities/grants/democratic-governance-in-zambia
  const pageSlugIndex = slugsCount < 3 ? slugsCount - 1 : 1;
  return params.slugs?.[pageSlugIndex] || "index";
}

export async function getPageProps(api, context) {
  const { defaultLocale, locale, locales, params } = context;
  const fallbackLocale = defaultLocale;
  const slug = getPageSlug(context);
  const pathname = slug !== "index" ? `/${params.slugs.join("/")}` : "/";

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
  const processedPage = processPage
    ? await processPage(page, api, context)
    : page;
  if (!processedPage) {
    return null;
  }

  const { settings, ...globalProps } = await getGlobalProps(
    { defaultLocale, locale },
    api
  );
  const seo = getPageSeoFromMeta(processedPage, settings, {
    locale,
    locales,
    pathname,
  });
  return {
    ...globalProps,
    ...processedPage,
    seo,
  };
}

export default getPageProps;
