import {
  organisations as orgMocks,
  tools as toolMocks,
} from "@/charterafrica/lib/data/_mock/ecosystemJson";
import getPageUrl from "@/charterafrica/lib/data/common/getPageUrl";
import queryString from "@/charterafrica/utils/articles/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

async function processPageSingleOrganisation(page, api, context) {
  const { params, locale } = context;
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = orgMocks(collection, {
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
  const { docs: toolDocs } = toolMocks("tools", {
    locale,
    where: {
      organisation: {
        in: [organisation.id],
      },
    },
  });

  const pageUrl = await getPageUrl(api, "tools");
  const tools = toolDocs.map((tool) => {
    let href = null;
    if (pageUrl) {
      href = `${pageUrl}/${tool.slug}`;
    }
    return {
      ...tool,
      link: {
        href,
      },
      image: tool.avatarUrl ?? null,
      description: tool?.description || " ",
      name: tool.name || " ",
    };
  });

  return {
    ...page,
    blocks: [
      {
        slug: "entity",
        image: organisation.avatarUrl ?? null,
        name: organisation?.name ?? null,
        location: organisation?.location ?? null,
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
  const fields = ["description", "location", "name", "externalId", "slug"];
  const toolQueries = orQueryBuilder(fields, search);
  const query = {
    or: toolQueries,
  };
  const filterLabels = labelsPerLocale[locale];
  const { docs, ...pagination } = orgMocks("organisations", {
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
    return processPageSingleOrganisation(page, api, context);
  }
  const { blocks } = page;
  const foundIndex = blocks.findIndex(({ slug }) => slug === "organisations");
  const filterLabels = labelsPerLocale[locale];
  const filterOptions = [
    {
      type: "select",
      name: "sort",
      options: [
        { value: "topic", label: filterLabels.topic },
        { value: "-topic", label: filterLabels["-topic"] },
        { value: "views", label: filterLabels.views },
        { value: "-views", label: filterLabels["-views"] },
        { value: "stars", label: filterLabels.stars },
        { value: "-stars", label: filterLabels["-stars"] },
        { value: "name", label: filterLabels.name },
      ],
    },
    {
      type: "select",
      name: "stars",
      label: "Rating",
      options: [
        {
          value: "",
          label: "All",
        },
        {
          value: "<1000",
          label: "<1000",
        },
      ],
    },
    {
      type: "select",
      name: "expert",
      label: "Expert",
      multiple: true,
      options: [
        {
          value: "Expert",
          label: "Expert",
        },
      ],
    },
  ];
  const organisations = {
    slug: "organisations",
    results,
    pagination,
    title: filterLabels.organisations,
    searchPlaceholder: filterLabels.searchOrganisations,
    filterOptions,
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = organisations;
  } else {
    blocks.push(organisations);
  }

  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/collection/organisations`;
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

export default processPageOrganisations;
