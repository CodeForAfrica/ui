import { deepmerge } from "@mui/utils";

import articlesQueryString from "@/charterafrica/utils/articles/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";

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
    content: post.content ?? null,
    author: post.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    image,
    date: formatDateTime(post.publishedOn, { locale }),
    link: {
      href,
    },
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
  const { page = 1, pageSize = 8, q, sort = "-publishedOn" } = query;

  return { locale, page, pageSize, q, sort };
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
        {
          "excerpt.children.text": {
            like: q,
          },
        },
        {
          "content.richTextBlockFields.content.children.text": {
            like: q,
          },
        },
      ],
    };
  }
  const { slug: collection } = page;
  const { docs, totalPages } = await api.getCollection(collection, {
    locale,
    sort,
    page: pageNumber,
    limit: pageSize,
    where: {
      ...query,
      _status: { equals: "published" },
    },
  });
  let results = [];
  if (docs?.length) {
    results = docs.map((post) => processPost(post, page, api, context));
  }

  return {
    results,
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
    id: `articles-${slug}`,
  };
  blocks.push(articlesBlock);

  // SWR fallback
  let swrKey = `/api/v1/knowledge/${slug}`;
  const qs = articlesQueryString(getArticlesQuery(context));
  if (qs) {
    swrKey = `${swrKey}?${qs}`;
  }
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [swrKey]: articles,
  };

  return page;
}

export async function processPageEvents(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageArticlePost(page, api, context);
  }

  // For now, we don't show /opportunities/events by itself
  return null;
}

export default processPageArticles;
