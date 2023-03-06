import { deepmerge } from "@mui/utils";

import { getPageSeoFromMeta } from "@/charterafrica/lib/data/seo";
import formatDate from "@/charterafrica/utils/formatDate";
import { getConfigs } from "@/charterafrica/utils/translationConfigs";

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

export async function processPageAbout(page, api, { locale }) {
  const { blocks } = page;
  const { docs } = await api.getCollection("grantees", {
    sort: "-publishedOn",
    locale,
    where: { _status: { equals: "published" } },
  });
  const grantees = docs.map((item) => ({ ...item, image: item.coverImage }));
  blocks.push({
    slug: "grantees",
    title: "Grantees",
    grantees,
  });

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

async function processPageEvents({ blocks }, api, { locale }) {
  const configs = await getConfigs(api, { locale });

  const { docs: eventDocs } = await api.getCollection("events", {
    locale,
    where: { _status: { equals: "published" } },
    limit: 100, // Perform pagination here
  });
  const featuredArticle =
    blocks.find(
      (block) =>
        block.slug === "featured-post" &&
        block.featuredPost?.relationTo === "events"
    )?.featuredPost?.value ?? null;

  const events = eventDocs.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    image: item.coverImage ?? null,
    category: item.topic,
    registerLink: item.register ?? null,
    registerText: item?.register?.label ?? null,
    status:
      new Date(item.date).getTime() < new Date().getTime()
        ? "past"
        : "upcoming",
    date: formatDate(item.date, { locale }),
    featured: featuredArticle && item.id === featuredArticle?.id,
  }));
  blocks.push({
    slug: "events",
    title: configs.events.title,
    items: events,
    config: configs?.events ?? null,
  });
}

async function processPageGrants({ blocks }, api, { locale }) {
  const { docs: grantDocs } = await api.getCollection("grants", {
    sort: "-publishedOn",
    locale,
  });
  const configs = await getConfigs(api, { locale });
  const grants = grantDocs.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    status: item.status,
    image: item.coverImage,
    date: formatDate(item.deadline, { locale }),
  }));

  blocks.push({
    slug: "grants",
    title: configs.grants.title,
    items: grants,
    config: configs?.grants ?? null,
  });
}

async function processPageFellowships(page, api, { locale }) {
  const { blocks } = page;
  const { docs: fellowshipDocs } = await api.getCollection("fellowships", {
    sort: "-publishedOn",
    locale,
  });
  const configs = await getConfigs(api, { locale });

  const fellowships = fellowshipDocs.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    image: item.coverImage,
    status: item.category ?? null,
    date: formatDate(item.deadline, { locale }),
    registerLink: item.registerLink ?? null,
    config: configs.fellowships,
  }));
  blocks.push({
    slug: "fellowships",
    title: configs.fellowships.title,
    items: fellowships,
    config: configs?.fellowships ?? null,
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
    date: formatDate(post.publishedOn, { locale, includeTime: true }),
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

async function processPageArticles(page, api, context) {
  const { params, locale } = context;
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
    locale,
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

// maybe page slug will be sth like events-grants-and-fellowships
async function processOpportunityPage(page, api, context) {
  page.blocks.push({
    slug: "fellowships-and-grants-header",
    title: "Grants and Fellowships",
  });
  await processPageGrants(page, api, context);
  await processPageFellowships(page, api, context);
  await processPageEvents(page, api, context);
  return page;
}

const processPageFunctionsMap = {
  about: processPageAbout,
  explainers: processPageExplainers,
  events: processOpportunityPage,
  fellowships: processOpportunityPage,
  grants: processOpportunityPage,
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
