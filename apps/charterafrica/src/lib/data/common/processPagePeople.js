import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

async function processSingleContributor(page, api, context) {
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
  const filterLabels = labelsPerLocale[locale];
  const contributor = docs[0] || {};
  const { docs: toolDocs } = await api.getCollection("tools", {
    locale,
    where: {
      people: {
        in: [contributor.id],
      },
    },
  });

  const tools = toolDocs.map((tool) => ({
    ...tool,
    image: tool.avatarUrl ?? null,
    description: tool?.description || " ",
    name: tool.name || " ",
  }));

  return {
    ...page,
    blocks: [
      {
        slug: "org-or-person",
        image: contributor.avatarUrl ?? null,
        name: contributor?.fullName ?? null,
        location: contributor.country ?? null,
        description: contributor.description ?? null,
        twitter: contributor.twitter,
        email: contributor.email ?? null,
        toolsTitle: filterLabels.tools,
        lastActive: contributor.lastActive
          ? formatDateTime(contributor.lastActive, {})
          : null,
        github:
          contributor.source === "github"
            ? `https://github.com/${contributor?.username || ""}`
            : "",
        tools,
      },
    ],
  };
}

async function processPagePeople(page, api, context) {
  const { blocks } = page;
  const {
    locale,
    params,
    query: { page: pageNumber = 1, limit = 12, search, sort = "name" } = {},
  } = context;
  if (params?.slugs?.length > 2) {
    return processSingleContributor(page, api, context);
  }
  const toolQueries = orQueryBuilder(
    ["description", "fullName", "country", "userName", "externalId"],
    search
  );
  const query = {
    or: toolQueries,
  };
  const filterLabels = labelsPerLocale[locale];
  const { docs, ...pagination } = await api.getCollection("people", {
    locale,
    page: pageNumber,
    limit,
    sort,
    where: {
      ...query,
    },
  });
  const results = docs.map((person) => {
    return {
      ...person,
      description: person.description || " ",
      name: person.fullName || " ",
      image: person.avatarUrl ?? null,
      lastActive: person.lastActive
        ? formatDateTime(person.lastActive, {})
        : null,
    };
  });

  const foundIndex = blocks.findIndex(({ slug }) => slug === "people");
  const tool = {
    slug: "people",
    title: filterLabels.people,
    results,
    pagination,
    searchPlaceholder: filterLabels.searchPeople,
    sortOrder: [{ value: "name", label: filterLabels.name }],
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = tool;
  } else {
    blocks.push(tool);
  }
  return page;
}

export default processPagePeople;
