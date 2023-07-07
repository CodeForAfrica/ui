import articlesQueryString from "@/charterafrica/utils/articles/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";

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

function processPost(post, parentPage, _, context) {
  const { breadcrumbs = [] } = parentPage;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  const { content, coverImage, ...other } = post;
  const { locale } = context;

  const date = formatDateTime(post.publishedOn, { locale });
  let image = null;
  if (coverImage) {
    const { alt, url } = coverImage;
    image = {
      alt: alt || post.title,
      url,
    };
  }
  let link = null;
  if (pageUrl) {
    const { slug } = post;
    link = {
      href: `${pageUrl}/${slug}`,
    };
  }

  return {
    ...other,
    author: post.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    date,
    image,
    link,
  };
}

export async function getArticles(parentPage, api, context) {
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
  const { slug: collection } = parentPage;
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
    results = docs.map((post) => processPost(post, parentPage, api, context));
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

async function articles(block, page, api, context) {
  const query = getArticlesQuery(context);
  const { page: pageNumber, locale } = query;
  const { featuredPost, title, ...other } = block;
  let featured = null;
  if (pageNumber === 1) {
    if (featuredPost) {
      if (featuredPost.value) {
        const variant = featuredPost.relationTo;
        featured = {
          ...processPost(featuredPost.value, page, api, context),
          variant,
        };
      }
    }
  }
  const foundArticles = await getArticles(page, api, context);
  const tags = await getTags(page, api, context);
  const filterLabels = filtersLabelsPerLocale[locale];
  const { slug } = page;

  // SWR fallback
  let swrKey = `/api/v1/knowledge/${slug}`;
  const qs = articlesQueryString(query);
  if (qs) {
    swrKey = `${swrKey}?${qs}`;
  }
  // eslint-disable-next-line no-param-reassign
  const fallback = {
    [swrKey]: foundArticles,
  };

  return {
    block: {
      ...other,
      articles: foundArticles,
      collection: slug,
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
    },
    fallback,
  };
}

export default articles;
