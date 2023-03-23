import { deepmerge } from "@mui/utils";

import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";
import formatDateTime from "@/charterafrica/utils/formatDate";
import queryString from "@/charterafrica/utils/queryString";

export async function getGlobalProps({ locale, defaultLocale }, api) {
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

async function processPageAbout(page, api, { locale }) {
  const { blocks } = page;
  const foundIndex = blocks.findIndex(({ slug }) => slug === "our-grantees");
  if (foundIndex > -1) {
    const { sort, slug, title } = blocks[foundIndex];
    const { docs } = await api.getCollection("grantees", {
      sort,
      locale,
      where: { _status: { equals: "published" } },
    });
    const grantees = docs.map((item) => ({ ...item, image: item.coverImage }));
    blocks[foundIndex] = {
      grantees,
      slug,
      title,
    };
  }

  return page;
}

async function processPageExplainers(page, api, context) {
  const collection = await api.getCollection("explainers", context);
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
    date: formatDateTime(post.publishedOn, { locale }),
    link: {
      href,
    },
  };
}

async function processPageArticlePost(page, api, context) {
  const { params, locale } = context;
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection(collection, {
    locale,
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

export async function getTags(page, api, context) {
  const { locale } = context;
  const { slug: collection } = page;
  const { docs } = await api.getCollection(collection, {
    locale,
    where: {
      _status: { equals: "published" },
    },
  });

  if (!docs?.length) {
    return null;
  }
  const tags = docs.flatMap((doc) => doc.tags).filter((tag) => tag?.slug);
  const frequency = tags.reduce((acc, cur) => {
    if (cur?.slug) {
      acc[cur.slug] = (acc[cur.slug] || 0) + 1;
    }
    return acc;
  }, {});
  return tags.sort((a, b) => frequency[a.slug] - frequency[b.slug]);
}

function getArticlesQuery(context) {
  const { query = {}, locale } = context;
  const {
    page: pageNumber = 1,
    pageSize = 8,
    q,
    sort = "-publishedOn",
  } = query;

  return { locale, page: pageNumber, pageSize, q, sort };
}

export async function getArticles(page, api, context) {
  const {
    locale,
    page: pageNumber,
    pageSize,
    q,
    sort,
  } = getArticlesQuery(context);
  let query;
  if (q) {
    query = {
      or: [
        {
          title: {
            like: q,
          },
        },
        {
          "tags.name": {
            contains: q,
          },
        },
      ],
    };
  }
  const { slug: collection } = page;
  const { docs, totalPages } = await api.getCollection(collection, {
    locale,
    sort,
    limit: pageSize,
    where: {
      ...query,
      page: pageNumber,
      _status: { equals: "published" },
    },
  });

  if (!docs?.length) {
    return null;
  }
  const processedArticles = docs.map((post) =>
    processPost(post, page, api, context)
  );

  return {
    results: processedArticles,
    totalPages,
  };
}

const filtersLabelsPerLocale = {
  en: {
    "-publishedOn": "Most recent",
    publishedOn: "Least recent",
    title: "Title A-Z",
    "-title": "Title Z-A",
    search: "Search",
  },
  fr: {
    "-publishedOn": "Plus récent",
    publishedOn: "Moins récent",
    title: "Titre A-Z",
    "-title": "Titre Z-A",
    search: "Recherche",
  },
  pt: {
    "-publishedOn": "Mais recente",
    publishedOn: "Menos recente",
    title: "Título A-Z",
    "-title": "Título Z-A",
    search: "Pesquisa",
  },
};

async function processPageArticles(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageArticlePost(page, api, context);
  }

  const { locale, query: { page: pageNumber = 1 } = {} } = context;
  const { blocks } = page;
  const foundIndex = blocks.findIndex(({ slug }) => slug === "featured-post");
  let featured = null;
  if (foundIndex > -1) {
    if (pageNumber === 1) {
      const foundValue = blocks[foundIndex].featuredPost?.value;
      if (foundValue) {
        const variant = blocks[foundIndex].featuredPost?.relationTo;
        featured = {
          ...processPost(foundValue, page, api, context),
          variant,
          slug: "featured-post",
        };
      }
    }

    // Featured should be rendered as part of articles
    blocks.splice(foundIndex, 1);
  }
  const articles = await getArticles(page, api, context);
  const tags = await getTags(page, api, context);
  const filterLabels = filtersLabelsPerLocale[locale];
  const { slug, title } = page;
  const articlesBlock = {
    articles,
    featured,
    filters: {
      search: {
        placeholder: filterLabels.search,
      },
      sortOrder: [
        { value: "-publishedOn", label: filterLabels["-publishedOn"] },
        { value: "publishedOn", label: filterLabels.publishedOn },
        { value: "title", label: filterLabels.title },
        { value: "-title", label: filterLabels["-title"] },
      ],
      tags,
      title,
    },
    slug,
    title,
    // since there can be 1 articles block per page
    id: "articles",
  };
  blocks.push(articlesBlock);

  // SWR fallback
  let swrKey = `/api/knowledge/${slug}`;
  const qs = queryString(getArticlesQuery(context));
  if (qs) {
    swrKey = `${swrKey}?${qs}`;
  }
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [swrKey]: articles,
  };

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

function processOpportunity(opportunity, pageUrl, api, context) {
  let image = null;
  if (opportunity.coverImage) {
    const { alt, url } = opportunity.coverImage;
    image = {
      alt: alt || opportunity.title,
      url,
    };
  }
  let href = null;
  if (pageUrl) {
    const { slug } = opportunity;
    href = `${pageUrl}/${slug}`;
  }
  const { locale } = context;
  return {
    ...opportunity,
    author:
      opportunity.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    image,
    // event date is more important than when the event was published
    date: formatDateTime(opportunity.date || opportunity.publishedOn, {
      locale,
    }),
    link: {
      href,
    },
  };
}

// /opportunities/fellowship/<slug> or /opportunities/grants/<slug>
async function processPageOpportunitiesPost(page, api, context) {
  const { params, locale } = context;
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection(collection, {
    locale,
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

  const [originalOpportunity] = docs;
  const opportunity = processOpportunity(
    originalOpportunity,
    page,
    api,
    context
  );
  let content = null;
  if (opportunity.content?.length) {
    content = opportunity.content.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    }));
  }
  return {
    ...page,
    meta: deepmerge(page.meta, opportunity.meta),
    title: `${opportunity.title} | ${page.title}`,
    blocks: [
      {
        ...opportunity,
        slug: "opportunity",
      },
      {
        content,
        slug: "longform",
      },
    ],
  };
}

async function fetchEvents(pageUrl, api, context) {
  const { locale } = context;
  const { docs } = await api.getCollection("events", {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
    locale,
  });
  if (!docs?.length) {
    return null;
  }

  const events = docs.map((item) => {
    const event = processOpportunity(item, pageUrl, api, context);
    const status =
      new Date(item.date).getTime() < new Date().getTime()
        ? "past"
        : "upcoming";
    return { ...event, status, variant: "event" };
  });
  return {
    items: events,
    config: {
      dateText: "deadline",
      showAllText: "show all",
      showLessText: "show less",
      showOnMobile: ["past", "upcoming"],
      statusGroupTitleSuffix: "",
    },
  };
}

async function fetchFellowships(pageUrl, api, context) {
  const { locale } = context;
  const { docs } = await api.getCollection("fellowships", {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
    locale,
  });
  if (!docs?.length) {
    return null;
  }

  const fellowships = docs.map((item) =>
    processOpportunity(item, pageUrl, api, context)
  );
  return {
    items: fellowships,
    config: {
      dateText: "deadline",
      showAllText: "show all",
      showLessText: "show less",
      showOnMobile: ["technologies"],
      statusGroupTitleSuffix: "",
    },
  };
}

async function fetchGrants(pageUrl, api, context) {
  const { locale } = context;
  const { docs } = await api.getCollection("grants", {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
    locale,
  });
  if (!docs?.length) {
    return null;
  }

  const fellowships = docs.map((item) =>
    processOpportunity(item, pageUrl, api, context)
  );
  return {
    items: fellowships,
    config: {
      dateText: "deadline",
      showAllText: "show all",
      showLessText: "show less",
      showOnMobile: ["open"],
      statusGroupTitleSuffix: "",
    },
  };
}

async function processPageEvents(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageArticlePost(page, api, context);
  }

  // For now, we don't show /opportunities/events by itself
  return null;
}

async function processPageFellowships(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageOpportunitiesPost(page, api, context);
  }

  // For now, we don't show /opportunities/fellowships by itself
  return null;
}

async function processPageGrants(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageOpportunitiesPost(page, api, context);
  }

  // For now, we don't show /opportunities/grants by itself
  return null;
}

const fetchOpportunitiesCollectionFunctionMap = {
  events: fetchEvents,
  fellowships: fetchFellowships,
  grants: fetchGrants,
};

// maybe page slug will be sth like events-grants-and-fellowships
async function processPageOpportunities(page, api, context) {
  const { blocks, breadcrumbs = [] } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1].url;
  const opportunitiesBlocks = await Promise.all(
    blocks
      .filter((b) => b.slug === "opportunities")
      .map(async (b) => {
        const { featured: originalFeatured, items: originalItems } = b;
        let featured = null;
        if (originalFeatured) {
          const foundValue = originalFeatured?.value;
          if (foundValue) {
            const collection = originalFeatured.relationTo;
            featured = {
              ...processOpportunity(
                foundValue,
                `${pageUrl}/${collection}`,
                api,
                context
              ),
              variant: collection,
              slug: "featured-post",
            };
          }
        }
        const items = await Promise.all(
          originalItems.map(async ({ collection, ...other }) => {
            let found = null;
            const collectionPageUrl = `${pageUrl}/${collection}`;
            const fetchCollection =
              fetchOpportunitiesCollectionFunctionMap[collection];
            if (fetchCollection) {
              found = await fetchCollection(collectionPageUrl, api, context);
            }

            return { ...other, ...found, collection };
          })
        );

        return { ...b, featured, items };
      })
  );
  if (!opportunitiesBlocks.length) {
    return page;
  }

  // Maintain block order
  opportunitiesBlocks.forEach((ob) => {
    const i = blocks.findIndex((b) => b.id === ob.id);
    blocks[i] = ob;
  });
  return page;
}

const processPageFunctionsMap = {
  about: processPageAbout,
  explainers: processPageExplainers,
  events: processPageEvents,
  fellowships: processPageFellowships,
  grants: processPageGrants,
  opportunities: processPageOpportunities,
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
