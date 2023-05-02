import formatDateTime from "@/charterafrica/utils/formatDate";

const filtersLabelsPerLocale = {
  en: {
    topic: "Topic A-Z",
    "-topic": "Topic Z-A",
    views: "Views Ascending",
    "-views": "Views Descending",
    stars: "Stars Ascending",
    "-stars": "Stars Descending",
    name: "Name",
    goToRepo: "Go to Repo",
    contribute: "Contribute",
    tools: "Tools",
    contributors: "Contributors",
    active: "Active",
    people: "People",
    searchTools: "Search Tools",
    organisations: "organisations",
    searchPeople: "Search People",
    searchOrganisations: "Search organisations",
  },
  fr: {
    topic: "Sujet A-Z",
    "-topic": "Sujet Z-A",
    views: "Vues ascendantes",
    "-views": "Vues descendant",
    stars: "Étoiles ascendant",
    "-stars": "Stars descendant",
    name: "Nom",
    goToRepo: "Aller au référentiel",
    contribute: "Contribuer",
    tools: "Outils",
    contributors: "Contributeurs",
    active: "Actif",
    people: "Personnes",
    searchTools: "Outils de recherche",
    organisations: "Organisations",
    searchPeople: "Recherche de personnes",
    searchOrganisations: "Recherche d'organisations",
  },
  pt: {
    topic: "Tópico A-Z",
    "-topic": "Tópico Z-A",
    views: "Visualizações ascendentes",
    "-views": "Vistas descendentes",
    stars: "Estrelas ascendendo",
    "-stars": "Estrelas descendentes",
    name: "Nome",
    goToRepo: "Vá para o repositório",
    contribute: "Contribuir",
    tools: "Ferramentas",
    contributors: "Colaboradores",
    active: "Activo",
    people: "Pessoas",
    searchTools: "Ferramentas de busca",
    organisations: "Organizaçãoes",
    searchPeople: "Procurar pessoas",
    searchOrganisations: "Procurar organizações",
  },
};

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
    name: person.name || person?.fullName || null,
  }));
  const tools = [];
  const filterLabels = filtersLabelsPerLocale[locale];
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

async function processSingleOrganisation(page, api, context) {
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
  const filterLabels = filtersLabelsPerLocale[locale];
  const organisation = docs[0] || {};
  const { docs: toolDocs } = await api.getCollection("tools", {
    locale,
    where: {
      organisation: {
        in: [organisation.id],
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
        image: organisation.avatarUrl ?? null,
        name: organisation?.name ?? null,
        location: organisation?.country ?? null,
        description: organisation.description,
        twitter: organisation.twitter,
        email: organisation.email ?? null,
        toolsTitle: filterLabels.tools,
        lastActive: organisation.lastActive
          ? formatDateTime(organisation.lastActive, {})
          : null,
        github:
          organisation.source === "github"
            ? `https://github.com/${organisation?.username || ""}`
            : "",
        tools,
      },
    ],
  };
}

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
  const filterLabels = filtersLabelsPerLocale[locale];
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

export async function processPageDemocracyTools(page, api, context) {
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

export async function processPageOrganisations(page, api, context) {
  const { blocks, breadcrumbs } = page;
  const {
    locale,
    params,
    query: { page: pageNumber = 1, limit = 12, search, sort } = {},
  } = context;
  if (params?.slugs?.length > 2) {
    return processSingleOrganisation(page, api, context);
  }
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
      description: tool?.description || " ",
      name: tool.name || " ",
      activeText: filterLabels.active,
      lastActive: tool.lastActive ? formatDateTime(tool.lastActive, {}) : null,
    };
  });

  const foundIndex = blocks.findIndex(({ slug }) => slug === "organisations");
  const tool = {
    slug: "organisations",
    results,
    pagination,
    title: filterLabels.organisations,
    searchPlaceholder: filterLabels.searchOrganisations,
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
    params,
    query: { page: pageNumber = 1, limit = 12, search, sort } = {},
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
    sortOrder: [{ value: "fullName", label: filterLabels.name }],
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = tool;
  } else {
    blocks.push(tool);
  }
  return page;
}
