import getPageUrl from "@/charterafrica/lib/data/common/getPageUrl";
import { allCountries } from "@/charterafrica/lib/data/json/countries";
import { ORGANIZATION_COLLECTION } from "@/charterafrica/payload/utils/collections";
import queryString from "@/charterafrica/utils/ecosystem/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

async function processPageSingleOrganisation(page, api, context) {
  const { params, locale } = context;
  const { slug: collection, blocks } = page;
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
  const organisation = docs[0] || {};

  const pageUrl = await getPageUrl(api, "tools");
  const tools = organisation.tools.map((tool) => {
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
  const block = blocks.findIndex(
    ({ slug: bSlug }) => bSlug === "our-organisations"
  );
  return {
    ...page,
    blocks: [
      {
        ...organisation,
        id: organisation.id,
        slug: "entity",
        image: organisation.avatarUrl ?? null,
        name: organisation?.name ?? null,
        location: organisation?.location ?? null,
        description: organisation.description ?? null,
        twitter: organisation.twitter ?? null,
        email: organisation.email ?? null,
        toolsTitle: block?.toolsTitle ?? null,
        lastActive: organisation.lastActive
          ? formatDateTime(organisation.lastActive, {})
          : null,
        github:
          organisation.source === "github"
            ? `https://github.com/${organisation?.externalId || ""}`
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
  const { docs, ...pagination } = await api.getCollection(
    ORGANIZATION_COLLECTION,
    {
      locale,
      page: pageNumber,
      limit,
      sort,
      where: {
        ...query,
      },
    }
  );
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
      name: tool.name ?? tool?.externalId ?? null,
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
  const foundIndex = blocks.findIndex(
    ({ slug }) => slug === "our-organisations"
  );
  if (foundIndex < 0) {
    return { notFound: true };
  }
  const { filters, title } = blocks[foundIndex];
  const filterLabels = labelsPerLocale[locale];
  const filterOptions =
    filters?.map((filter) => {
      if (filter === "sort") {
        return {
          type: "select",
          name: "sort",
          label: filterLabels.sort,
          options: [
            { value: "fullName", label: filterLabels.name },
            { value: "-fullName", label: filterLabels["-name"] },
            { value: "externalId", label: filterLabels.username },
            { value: "-externalId", label: filterLabels["-username"] },
          ],
        };
      }
      if (filter === "location") {
        return {
          type: "select",
          name: "location",
          label: filterLabels.location,
          options: allCountries.map((country) => ({
            value: country.value,
            label: country.label?.[locale || "en"],
          })),
        };
      }
      return null;
    }) ?? [];

  const organisations = {
    slug: "organisations",
    results,
    pagination,
    title,
    id: blocks[foundIndex]?.id,
    searchPlaceholder: filterLabels.searchOrganisations,
    filterOptions,
  };

  blocks[foundIndex] = organisations;

  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/ecosystem`;
  const qs = queryString({ ...queryParams, collection: "organisations" });
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
