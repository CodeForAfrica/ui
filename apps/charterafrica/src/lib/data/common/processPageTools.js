import getPageUrl from "@/charterafrica/lib/data/common/getPageUrl";
import { allCountries } from "@/charterafrica/lib/data/json/countries";
import {
  TOOL_COLLECTION,
  ORGANIZATION_COLLECTION,
} from "@/charterafrica/payload/utils/collections";
import queryString from "@/charterafrica/utils/ecosystem/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

const getRepoLink = (tool) => {
  switch (tool.source && tool.externalId) {
    case "github":
      return `https://github.com/${tool.externalId}`;
    default:
      return "";
  }
};

async function processPageSingleTool(page, api, context) {
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
  const contributorPage = await getPageUrl(api, "contributors");
  const contributors = tool?.contributors?.map((person) => ({
    ...person,
    link: { href: `${contributorPage}/${person.slug}` },
    name: person.name || person?.fullName || person.username || null,
  }));
  const { docs: orgDocs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    locale,
    where: {
      tools: {
        contains: tool?.id,
      },
    },
  });
  const tools = [];
  const filterLabels = labelsPerLocale[locale];
  return {
    ...page,
    blocks: [
      {
        ...tool,
        slug: "tool",
        link: {
          href: tool.link,
          label: "",
        },
        contribute: {
          href: getRepoLink(tool),
          label: filterLabels.contribute,
        },
        goToRepo: {
          href: getRepoLink(tool),
          label: filterLabels.goToRepo,
        },
        topicLabel: filterLabels.theme,
        contributors,
        tools,
        image: tool.avatarUrl ?? null,
        name: tool.name ?? null,
        topic: tool?.topic ?? null,
        donors: [],
        toolsTitle: filterLabels.tools,
        donorsTitle: filterLabels.donors,
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
        organisation: orgDocs?.[0] ?? null,
        supportersTitle: "Supporters",
        partnersTitle: "Partners",
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
  const fields = [
    "description",
    "theme",
    "operatingCountries",
    "name",
    "id",
    "slug",
  ];
  const toolQueries = orQueryBuilder(fields, search);
  const query = {
    or: toolQueries,
  };

  const { docs, ...pagination } = await api.getCollection(TOOL_COLLECTION, {
    locale,
    page: pageNumber,
    limit,
    sort,
    where: query,
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
      topicLabel: "Topic",
      exploreText: "Explore",
      contributorsCount: tool?.contributors?.length ?? null,
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
    return processPageSingleTool(page, api, context);
  }

  const { pagination, results } = await getTools(page, api, context);
  const foundIndex = blocks.findIndex(({ slug }) => slug === "our-tools");
  if (foundIndex < 0) {
    return { notFound: true };
  }
  const { filters } = blocks[foundIndex];
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    locale,
  });
  const themes = [...new Set(docs.map((item) => item.theme))].map((value) => ({
    value,
    label: value,
  }));
  const filterLabels = labelsPerLocale[locale];
  const filterOptions = filters.map((filter) => {
    if (filter === "sort") {
      return {
        type: "select",
        name: "sort",
        label: filterLabels.sort,
        options: [
          { value: "theme", label: filterLabels.topic },
          { value: "-theme", label: filterLabels["-theme"] },
          { value: "views", label: filterLabels.views },
          { value: "-views", label: filterLabels["-views"] },
          { value: "stars", label: filterLabels.stars },
          { value: "-stars", label: filterLabels["-stars"] },
          { value: "name", label: filterLabels.name },
        ],
      };
    }
    if (filter === "location") {
      return {
        type: "select",
        name: "homeCountry",
        label: filterLabels.location,
        options: allCountries.map((country) => ({
          value: country.value,
          label: country.label?.[locale || "en"],
        })),
      };
    }
    if (filter === "theme") {
      return {
        type: "select",
        name: "theme",
        label: filterLabels.theme,
        multiple: true,
        options: themes,
      };
    }
    return null;
  });
  const tool = {
    slug: "tools",
    id: blocks[foundIndex]?.id,
    results,
    pagination,
    searchPlaceholder: filterLabels.searchTools,
    filterOptions,
  };

  blocks[foundIndex] = tool;

  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/ecosystem`;
  const qs = queryString({ ...queryParams, collection: "tools" });
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
