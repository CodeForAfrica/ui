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

export async function processPageAbout({ blocks }, api) {
  const { docs } = await api.getCollection("grantees");
  const grantees = docs.map((item) => ({ ...item, image: item.coverImage }));
  blocks.push({
    slug: "grantees",
    title: "Grantees",
    grantees,
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

export async function processPageFellowships({ blocks }, api) {
  const { docs: grantDocs } = await api.getCollection("grants");
  const { docs = [] } = await api.getCollection("fellowships");
  const fellowships = docs.map((item) => ({
    ...item,
    description: item.excerpt,
    image: item.coverImage,
    deadline: new Date(item.deadline).toLocaleDateString(),
  }));
  const grants = grantDocs.map((item) => ({
    ...item,
    description: item.excerpt,
    image: item.coverImage,
    deadline: new Date(item.deadline).toLocaleDateString(),
  }));
  blocks.push({
    slug: "grants",
    title: "Grants",
    items: grants,
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
    items: fellowships,
    config: {
      showAllText: "Show All",
      showLessText: "Show Less",
      deadlineText: "Deadline",
      showOnMobile: ["technologies"],
      statusGroupTitleSuffix: "",
    },
  });
}

export async function processPageArticles(page, api, { locale }) {
  const { blocks, breadcrumbs = [], slug } = page;
  const { docs } = await api.getCollection(slug, {
    where: { _status: { equals: "published" } },
  });

  const processArticle = (data) => ({
    ...data,
    author: data?.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    image: data?.coverImage ?? null,
    date: new Date(data?.publishedOn).toLocaleString(locale),
    link: {
      href: breadcrumbs[breadcrumbs.length - 1]?.url
        ? `${breadcrumbs[breadcrumbs.length - 1].url}/${data?.slug}`
        : null,
    },
  });

  const articles = docs?.map(processArticle);
  const featuredArticle =
    blocks.find((block) => block.slug === "featured-post")?.featuredPost
      ?.value ?? null;
  const news = {
    slug: "news",
    title: "News",
    articles,
  };

  if (featuredArticle) {
    const featuredNewsPost = processArticle(featuredArticle);
    const category = `${slug?.charAt(0).toUpperCase()}${slug?.slice(1)}`;
    const featuredPost = {
      category,
      ...featuredNewsPost,
      slug: "featured-post",
    };
    blocks.push(featuredPost);
  }
  blocks.push(news);
}

const processPageFunctionsMap = {
  about: processPageAbout,
  explainers: processPageExplainers,
  news: processPageArticles,
  research: processPageArticles,
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
    await processPage(page, api, context);
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
