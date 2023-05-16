import queryString from "@/charterafrica/utils/articles/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

async function processSingleTool(page, api, context) {
  const { params, locale } = context;
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection(collection, {
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (!docs?.length) {
    return null;
  }
  const tool = docs[0];
  const contributors = tool?.people?.map((person) => ({
    ...person,
    name: person.name || person?.fullName || person.username || null,
  }));
  const tools = [];
  const filterLabels = labelsPerLocale[locale];
  return {
    ...page,
    blocks: [
      {
        slug: "tool",
        link: {
          href: tool.link,
          label: filterLabels.goToRepo,
        },
        contribute: {
          href: tool.link,
          label: filterLabels.contribute,
        },
        contributors,
        tools,
        image: tool.avatarUrl ?? null,
        name: tool.name ?? null,
        topic: tool?.topic ?? null,
        toolsTitle: filterLabels.tools,
        contributorsTitle: filterLabels.contributors,
        lastActive: tool.lastActive
          ? formatDateTime(tool.lastActive, {})
          : null,
        organisationName: tool.organisation?.name ?? null,
        twitter: tool.organisation?.twitter ?? null,
        github: tool.link ?? null,
        email: tool.organisation?.email ?? null,
        location: tool.organisation?.location ?? null,
        description: tool.description ?? null,
      },
    ],
  };
}

export async function getTools(page, api, context) {
  const { breadcrumbs } = page;
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, search, sort = "name" } = {},
  } = context;
  const fields = ["description", "topic", "location", "name", "id", "slug"];
  const toolQueries = orQueryBuilder(fields, search);
  const query = {
    or: toolQueries,
  };

  const { docs, ...pagination } = await api.getCollection("tools", {
    locale,
    page: pageNumber,
    limit,
    sort,
    where: {
      ...query,
      deletedAt: {
        equals: null,
      },
    },
  });

  const results = docs.map((tool) => {
    let href = null;
    const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
    if (pageUrl) {
      const { slug } = tool;
      href = `${pageUrl}/${slug}`;
    }
    return {
      ...tool,
      description: tool.description ?? " ",
      link: {
        href,
      },
      image: tool.avatarUrl ?? null,
    };
  });
  return { results, pagination };
}

async function processPageTools(page, api, context) {
  const { blocks } = page;
  const { locale, params } = context;
  if (params.slugs.length > 2) {
    return processSingleTool(page, api, context);
  }
  const { pagination, results } = await getTools(page, api, context);
  const foundIndex = blocks.findIndex(({ slug }) => slug === "tools");
  const filterLabels = labelsPerLocale[locale];
  const tool = {
    slug: "tools",
    results,
    pagination,
    searchPlaceholder: filterLabels.searchTools,
    sortOrder: [
      { value: "topic", label: filterLabels.topic },
      { value: "-topic", label: filterLabels["-topic"] },
      { value: "views", label: filterLabels.views },
      { value: "-views", label: filterLabels["-views"] },
      { value: "stars", label: filterLabels.stars },
      { value: "-stars", label: filterLabels["-stars"] },
      { value: "name", label: filterLabels.name },
    ],
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = tool;
  } else {
    blocks.push(tool);
  }
  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/collection/tools`;
  const qs = queryString(queryParams);
  if (qs) {
    swrKey = `${swrKey}?${qs}`;
  }
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [swrKey]: results,
  };
  return page;
}

export default processPageTools;
