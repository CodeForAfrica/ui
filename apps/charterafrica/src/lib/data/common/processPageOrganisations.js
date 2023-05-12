import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

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
  const filterLabels = labelsPerLocale[locale];
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

export async function getOrganisations(page, api, context) {
  const { breadcrumbs } = page;
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, search, sort = "name" } = {},
  } = context;
  const toolQueries = orQueryBuilder(
    ["description", "location", "name", "externalId", "slug"],
    search
  );
  const query = {
    or: toolQueries,
  };
  const filterLabels = labelsPerLocale[locale];
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

  return { pagination, results };
}

async function processPageOrganisations(page, api, context) {
  const { pagination, results } = await getOrganisations(page, api, context);
  const { locale, params } = context;
  if (params?.slugs?.length > 2) {
    return processSingleOrganisation(page, api, context);
  }
  const { blocks } = page;
  const foundIndex = blocks.findIndex(({ slug }) => slug === "organisations");
  const filterLabels = labelsPerLocale[locale];
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
  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/organisations`;
  const qs = new URLSearchParams(queryParams).toString();
  if (qs) {
    swrKey = `${swrKey}?${qs}`;
  }
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [swrKey]: results,
  };
  return page;
}

export default processPageOrganisations;
