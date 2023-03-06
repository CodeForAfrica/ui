import { deepmerge } from "@mui/utils";

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

export async function processPageAbout(page, api) {
  const { blocks } = page;
  const { docs } = await api.getCollection("grantees");
  const grantees = docs.map((item) => ({ ...item, image: item.coverImage }));
  blocks.push({
    slug: "grantees",
    title: "Grantees",
    grantees,
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

export async function processPageFellowships(page, api, { locale }) {
  const { blocks } = page;
  const { docs: grantDocs } = await api.getCollection("grants");
  const { docs: fellowshipDocs } = await api.getCollection("fellowships");
  const { docs: eventDocs } = await api.getCollection("events", {
    where: { _status: { equals: "published" } },
    limit: 100, // Perform pagination here
  });

  const featuredArticle =
    blocks.find(
      (block) =>
        block.slug === "featured-post" &&
        block.featuredPost?.relationTo === "events"
    )?.featuredPost?.value ?? null;

  const fellowships = fellowshipDocs.map((item) => ({
    ...item,
    description: item.excerpt,
    image: item.coverImage,
    status: item.category ?? null,
    date: new Date(item.deadline).toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));
  const grants = grantDocs.map((item) => ({
    ...item,
    description: item.excerpt,
    image: item.coverImage,
    date: new Date(item.deadline).toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  const events = eventDocs.map((item) => ({
    ...item,
    image: item.coverImage ?? null,
    category: item.topic,
    registerLink: item.link ?? null,
    registerText: item?.link?.label ?? null,
    status:
      new Date(item.date).getTime() < new Date().getTime()
        ? "past"
        : "upcoming",
    date: new Date(item.date).toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    featured: featuredArticle && item.id === featuredArticle?.id,
  }));

  blocks.push({
    slug: "grants",
    title: "Grants",
    items: grants,
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
    items: fellowships,
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
    items: events,
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
  const { params } = context;
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
  const { docs } = await api.getCollection(slug, {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
  });
  const articles =
    docs?.map((post) => processPost(post, page, api, context)) ?? null;
  const articlesBlock = {
    slug,
    title,
    articles,
  };
  blocks.push(articlesBlock);
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
