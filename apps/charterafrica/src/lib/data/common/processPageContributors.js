import { allCountries } from "@/charterafrica/lib/data/json/locations";
import {
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/payload/utils/collections";
import queryString from "@/charterafrica/utils/ecosystem/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const queryBuilder = (query) => {
  const { search, location, classification } = query;
  const fields = ["description", "fullName", "location", "externalId"];
  const where = {};
  if (search) {
    where.or = fields.map((field) => ({ [field]: { like: search } }));
  }
  if (location) {
    where.location = { equals: location };
  }
  if (classification) {
    where.classification = { equals: classification };
  }
  return where;
};

export async function getContributors(page, api, context) {
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, sort = "fullName" } = {},
  } = context;
  const where = queryBuilder(context.query);
  const { docs, ...pagination } = await api.getCollection(
    CONTRIBUTORS_COLLECTION,
    {
      locale,
      page: parseInt(pageNumber, 10) || 1,
      limit,
      sort,
      where,
    },
  );
  const results = docs.map((person) => {
    return {
      ...person,
      description: person.description || " ",
      name: person.fullName || person.externalId || null,
      image: person.avatarUrl ?? null,
      lastActive: person.lastActive
        ? formatDateTime(person.lastActive, {})
        : null,
    };
  });
  return { pagination, results };
}

async function processPagePerson(page, api, context) {
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

  const block = blocks.find(({ slug: bSlug }) => bSlug === "our-contributors");
  const contributor = docs[0] || {};
  const { docs: toolDocs } = await api.getCollection(TOOL_COLLECTION, {
    locale,
    where: {
      contributors: {
        in: [contributor.id],
      },
    },
  });

  const tools = toolDocs.map((tool) => {
    return {
      ...tool,
      image: tool.avatarUrl ?? null,
      description: tool?.description || " ",
      name: tool.name || " ",
    };
  });

  const { socialMedia = [] } = contributor;
  if (contributor.source === "github") {
    const github = {
      link: `https://github.com/${contributor?.externalId || ""}`,
      name: "gitHub",
    };
    socialMedia.push(github);
  }
  if (contributor.email) {
    const email = {
      link: `mailto:${contributor.email}`,
      name: "email",
    };
    socialMedia.push(email);
  }

  return {
    ...page,
    blocks: [
      {
        slug: "entity",
        id: block.id ?? null,
        image: contributor.avatarUrl ?? null,
        name: contributor?.fullName ?? contributor?.externalId ?? null,
        role: contributor.role ?? null,
        currentOrganisation: contributor.currentOrganisation ?? null,
        location: contributor.location ?? null,
        description: contributor.description ?? null,
        toolsTitle: block?.toolsTitle ?? null,
        lastActive: contributor.lastActive
          ? formatDateTime(contributor.lastActive, {})
          : null,
        tools,
        socialMedia,
        repositories: contributor.repositories ?? [],
        repositoriesTitle: block?.repositoriesTitle ?? null,
        organisations: contributor.organisations ?? [],
        organisationsTitle: block?.organisationsTitle ?? null,
      },
    ],
  };
}

async function processPageContributors(page, api, context) {
  const { blocks } = page;
  const { locale, params } = context;
  if (params?.slugs?.length > 2) {
    return processPagePerson(page, api, context);
  }
  const { pagination, results } = await getContributors(page, api, context);
  const foundIndex = blocks.findIndex(
    ({ slug }) => slug === "our-contributors",
  );
  if (foundIndex < 0) {
    return { notFound: true };
  }
  const { filters, title } = blocks[foundIndex];
  const filterLabels = labelsPerLocale[locale];
  const collections = [
    ...new Set(results.map((item) => item.classification)),
  ].map((value) => ({
    value: value ?? null,
    label: value ?? null,
  }));
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
      if (filter === "classification") {
        return {
          type: "select",
          name: "classification",
          label: filterLabels.collection,
          multiple: true,
          options: collections,
        };
      }
      return null;
    }) ?? [];
  const people = {
    slug: "contributors",
    title,
    results,
    filterOptions: filterOptions.filter(Boolean),
    id: blocks[foundIndex]?.id,
    pagination,
    searchPlaceholder: filterLabels.searchPeople,
  };

  blocks[foundIndex] = people;

  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/ecosystem`;
  const qs = queryString({ ...queryParams, collection: "contributors" });
  if (qs) {
    swrKey = `${swrKey}?${qs}`;
  }
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [swrKey]: results,
  };
  return page;
}

export default processPageContributors;
