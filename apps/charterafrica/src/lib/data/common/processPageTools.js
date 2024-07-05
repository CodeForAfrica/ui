import { allLocations } from "@/charterafrica/lib/data/json/locations";
import {
  TOOL_COLLECTION,
  ORGANIZATION_COLLECTION,
} from "@/charterafrica/payload/utils/collections";
import queryString from "@/charterafrica/utils/ecosystem/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const locales = (
  process.env.NEXT_PUBLIC_LOCALES || process.env.PAYLOAD_PUBLIC_LOCALES
)
  ?.split(",")
  ?.map((l) => l.trim())
  .filter(Boolean);
const defaultLocale =
  (
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE ||
    process.env.PAYLOAD_PUBLIC_DEFAULT_LOCALE
  )?.trim() || locales?.[0];

const queryBuilder = (query) => {
  const { search, theme, homeCountry, classification } = query;
  const where = {};
  if (search) {
    const fields = [
      "description",
      "theme",
      "operatingCountries",
      "name",
      "id",
      "slug",
      "homeCountry",
      "classification",
    ];
    where.or = fields.map((field) => ({ [field]: { like: search } }));
  }
  if (homeCountry) {
    where.homeCountry = {
      equals: homeCountry,
    };
  }
  if (theme) {
    where.theme = { equals: theme };
  }
  if (classification) {
    where.classification = { equals: classification };
  }
  return where;
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
  const { contributors } = tool;
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
  const organisation = orgDocs?.[0] ?? null;

  return {
    ...page,
    blocks: [
      {
        ...tool,
        slug: "tool",
        contribute: {
          href: tool.repoLink,
          label: filterLabels.contribute,
        },
        goToRepo: {
          href: tool.repoLink,
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
        lastActive: tool.lastCommit?.committedDate
          ? formatDateTime(tool.lastCommit.committedDate, { locale })
          : null,
        organisationName: tool.organisation?.name ?? null,
        twitter: tool.organisation?.twitter ?? null,
        github: tool.link ?? null,
        email: tool.organisation?.email ?? null,
        location: tool.organisation?.location ?? null,
        description: tool.description ?? null,
        organisation,
        supportersTitle: filterLabels.supporters,
        partnersTitle: filterLabels.partners,
        contributorsText: filterLabels.contributors,
        discussionText: filterLabels.discussions,
        commitText: filterLabels.lastCommit,
        forksText: filterLabels.forks,
        starsText: filterLabels.stars,
        starsAscendingText: filterLabels["+stars"],
        collectionText: filterLabels.collection,
        activeText: filterLabels.activeText,
        collection: tool.classification,
        externalLink: {
          href: tool.docLink ?? null,
        },
        lastCommit: {
          ...tool.lastCommit,
          committedDate: tool.lastCommit?.committedDate
            ? formatDateTime(tool.lastCommit.committedDate, { locale })
            : null,
        },
      },
    ],
  };
}

export async function getTools(page, api, context) {
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, sort = "name" } = {},
  } = context;
  const where = queryBuilder(context.query);
  const { docs, ...pagination } = await api.getCollection(TOOL_COLLECTION, {
    locale,
    page: pageNumber,
    limit,
    sort,
    where,
  });

  const results = docs.map((tool) => {
    return {
      ...tool,
      topicLabel: "Topic",
      exploreText: "Explore",
      contributorsCount: tool?.contributors?.length ?? null,
      description: tool.description ?? " ",
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
  const collections = [...new Set(docs.map((item) => item.classification))].map(
    (value) => ({
      value: value ?? null,
      label: value ?? null,
    }),
  );
  console.log({ context, locales, defaultLocale });
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
          { value: "stars", label: filterLabels["+stars"] },
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
        options: allLocations.map((country) => ({
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
  });
  const tool = {
    slug: "tools",
    id: blocks[foundIndex].id,
    results,
    pagination,
    searchPlaceholder: filterLabels.searchTools,
    filterOptions,
  };

  blocks[foundIndex] = tool;

  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/ecosystem`;
  const qs = queryString({ ...queryParams });
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
