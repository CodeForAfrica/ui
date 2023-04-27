const filtersLabelsPerLocale = {
  en: {
    topic: "Topic A-Z",
    "-topic": "Topic Z-A",
    views: "Views Ascending",
    "-views": "Views Descending",
    stars: "Stars Ascending",
    "-stars": "Stars Descending",
    name: "Name",
  },
  fr: {
    topic: "Sujet A-Z",
    "-topic": "Sujet Z-A",
    views: "Vues ascendantes",
    "-views": "Vues descendant",
    stars: "Étoiles ascendant",
    "-stars": "Stars descendant",
    name: "Name",
  },
  pt: {
    topic: "Tópico A-Z",
    "-topic": "Tópico Z-A",
    views: "Visualizações ascendentes",
    "-views": "Vistas descendentes",
    stars: "Estrelas ascendendo",
    "-stars": "Estrelas descendentes",
    name: "Name",
  },
};

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};
export async function processPageDemocracyTools(page, api, context) {
  const { blocks } = page;
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
  const filterLabels = filtersLabelsPerLocale[locale];
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
    return {
      ...tool,
      image: tool.avatarUrl ?? null,
    };
  });

  const foundIndex = blocks.findIndex(({ slug }) => slug === "tools");
  const tool = {
    slug: "tools",
    results,
    pagination,
    searchPlaceholder: "Search tools",
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

export async function processPageOrganisations(page, api, context) {
  const { blocks } = page;
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, search, sort } = {},
  } = context;
  const toolQueries = orQueryBuilder(
    ["description", "location", "name", "externalId"],
    search
  );
  const query = {
    or: toolQueries,
  };
  const filterLabels = filtersLabelsPerLocale[locale];
  const { docs, ...pagination } = await api.getCollection("organisations", {
    locale,
    page: pageNumber,
    limit,
    sort,
    where: {
      ...query,
    },
  });
  const results = docs.map((tool) => {
    return {
      ...tool,
      image: tool.avatarUrl ?? null,
      description: tool?.description || " ",
      name: tool.name || " ",
    };
  });

  const foundIndex = blocks.findIndex(({ slug }) => slug === "organisations");
  const tool = {
    slug: "organisations",
    results,
    pagination,
    searchPlaceholder: "Search tools",
    sortOrder: [{ value: "name", label: filterLabels.name }],
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = tool;
  } else {
    blocks.push(tool);
  }
  return page;
}

export async function processPagePeople(page, api, context) {
  const { blocks } = page;
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, search, sort } = {},
  } = context;
  const toolQueries = orQueryBuilder(
    ["description", "fullName", "country", "userName", "externalId"],
    search
  );
  const query = {
    or: toolQueries,
  };
  const filterLabels = filtersLabelsPerLocale[locale];
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
    };
  });

  const foundIndex = blocks.findIndex(({ slug }) => slug === "people");
  const tool = {
    slug: "people",
    results,
    pagination,
    searchPlaceholder: "Search tools",
    sortOrder: [{ value: "fullName", label: filterLabels.name }],
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = tool;
  } else {
    blocks.push(tool);
  }
  return page;
}
