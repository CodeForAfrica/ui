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
        name: tool.name,
        topic: tool.topic,
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

async function processPageTools(page, api, context) {
  const { blocks, breadcrumbs } = page;
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, search, sort } = {},
  } = context;
  const toolQueries = orQueryBuilder(
    ["description", "topic", "location", "name", "id"],
    search
  );
  const query = {
    or: toolQueries,
  };
  const { params } = context;
  if (params.slugs.length > 2) {
    return processSingleTool(page, api, context);
  }
  const filterLabels = labelsPerLocale[locale];
  const { docs, ...pagination } = await api.getCollection("tools", {
    locale,
    page: pageNumber,
    limit,
    sort,
    where: {
      ...query,
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
      link: {
        href,
      },
      image: tool.avatarUrl ?? null,
    };
  });

  const foundIndex = blocks.findIndex(({ slug }) => slug === "tools");
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
  return page;
}

export default processPageTools;
