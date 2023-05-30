import {
  people as peopleMocks,
  tools as toolMocks,
} from "@/charterafrica/lib/data/_mock/ecosystemJson";
import getPageUrl from "@/charterafrica/lib/data/common/getPageUrl";
import queryString from "@/charterafrica/utils/articles/queryString";
import formatDateTime from "@/charterafrica/utils/formatDate";
import labelsPerLocale from "@/charterafrica/utils/translationConstants";

const orQueryBuilder = (fields, search) => {
  return fields.map((field) => ({ [field]: { like: search } }));
};

export async function getPeople(page, api, context) {
  const { breadcrumbs } = page;
  const {
    locale,
    query: { page: pageNumber = 1, limit = 12, search, sort = "name" } = {},
  } = context;

  const fields = [
    "description",
    "fullName",
    "country",
    "userName",
    "externalId",
    "name",
  ];
  const toolQueries = orQueryBuilder(fields, search);
  const query = {
    or: toolQueries,
  };

  const { docs, ...pagination } = peopleMocks("people", {
    locale,
    page: pageNumber,
    limit,
    sort,
    where: {
      ...query,
    },
  });
  const results = docs.map((person) => {
    let href = null;
    const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
    if (pageUrl) {
      const { slug } = person;
      href = `${pageUrl}/${slug}`;
    }
    return {
      ...person,
      link: {
        href,
      },
      description: person.description || " ",
      name: person.fullName || person.username,
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
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = peopleMocks(collection, {
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
  const { docs: toolDocs } = toolMocks("tools", {
    locale,
    where: {
      people: {
        in: [contributor.id],
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
      image: tool.avatarUrl ?? null,
      description: tool?.description || " ",
      name: tool.name || " ",
      link: {
        href,
      },
    };
  });

  return {
    ...page,
    blocks: [
      {
        slug: "entity",
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
  const { locale, params } = context;
  if (params?.slugs?.length > 2) {
    return processPagePerson(page, api, context);
  }
  const { pagination, results } = await getPeople(page, api, context);
  const foundIndex = blocks.findIndex(({ slug }) => slug === "people");
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
  const people = {
    slug: "people",
    title: filterLabels.people,
    results,
    filterOptions,
    pagination,
    searchPlaceholder: filterLabels.searchPeople,
    sortOrder: [{ value: "name", label: filterLabels.name }],
  };

  if (foundIndex > -1) {
    blocks[foundIndex] = people;
  } else {
    blocks.push(people);
  }

  const { slugs, ...queryParams } = context.query;
  let swrKey = `/api/v1/resources/collection/people`;
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

export default processPagePeople;
