import { deepmerge } from "@mui/utils";

import formatDateTime from "@/charterafrica/utils/formatDate";

function processOpportunity(opportunity, pageUrl, api, context) {
  let image = null;
  if (opportunity.coverImage) {
    const { alt, url } = opportunity.coverImage;
    image = {
      alt: alt || opportunity.title,
      url,
    };
  }
  let href = null;
  if (pageUrl) {
    const { slug } = opportunity;
    href = `${pageUrl}/${slug}`;
  }
  const { locale } = context;
  return {
    ...opportunity,
    author:
      opportunity.authors?.map(({ fullName }) => fullName).join(", ") ?? null,
    content: opportunity?.content ?? null,
    image,
    // event date is more important than when the event was published
    date: formatDateTime(opportunity.date || opportunity.publishedOn, {
      locale,
    }),
    link: {
      href,
    },
  };
}

// /opportunities/fellowship/<slug> or /opportunities/grants/<slug>
async function processPageOpportunitiesPost(page, api, context) {
  const { params, locale } = context;
  const { slug: collection } = page;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection(collection, {
    locale,
    where: {
      slug: {
        equals: slug,
      },
      _status: { equals: "published" },
    },
  });
  if (!docs?.length) {
    return null;
  }

  const [originalOpportunity] = docs;
  const opportunity = processOpportunity(
    originalOpportunity,
    page,
    api,
    context
  );
  let content = null;
  if (opportunity.content?.length) {
    content = opportunity.content.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    }));
  }
  return {
    ...page,
    meta: deepmerge(page.meta, opportunity.meta),
    title: `${opportunity.title} | ${page.title}`,
    blocks: [
      {
        ...opportunity,
        slug: "opportunity",
      },
      {
        content,
        slug: "longform",
      },
    ],
  };
}

async function fetchEvents(pageUrl, api, context) {
  const { locale } = context;
  const { docs } = await api.getCollection("events", {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
    locale,
  });
  if (!docs?.length) {
    return null;
  }

  const events = docs.map((item) => {
    const event = processOpportunity(item, pageUrl, api, context);
    const status =
      new Date(item.date).getTime() < new Date().getTime()
        ? "past"
        : "upcoming";
    return { ...event, status, variant: "event" };
  });
  return {
    items: events,
    config: {
      dateText: "deadline",
      showAllText: "show all",
      showLessText: "show less",
      showOnMobile: ["past", "upcoming"],
      statusGroupTitleSuffix: "",
    },
  };
}

async function fetchFellowships(pageUrl, api, context) {
  const { locale } = context;
  const { docs } = await api.getCollection("fellowships", {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
    locale,
  });
  if (!docs?.length) {
    return null;
  }

  const fellowships = docs.map((item) =>
    processOpportunity(item, pageUrl, api, context)
  );
  return {
    items: fellowships,
    config: {
      dateText: "deadline",
      showAllText: "show all",
      showLessText: "show less",
      showOnMobile: ["technologies"],
      statusGroupTitleSuffix: "",
    },
  };
}

async function fetchGrants(pageUrl, api, context) {
  const { locale } = context;
  const { docs } = await api.getCollection("grants", {
    sort: "-publishedOn",
    where: { _status: { equals: "published" } },
    locale,
  });
  if (!docs?.length) {
    return null;
  }

  const fellowships = docs.map((item) =>
    processOpportunity(item, pageUrl, api, context)
  );
  return {
    items: fellowships,
    config: {
      dateText: "deadline",
      showAllText: "show all",
      showLessText: "show less",
      showOnMobile: ["open"],
      statusGroupTitleSuffix: "",
    },
  };
}

const fetchOpportunitiesCollectionFunctionMap = {
  events: fetchEvents,
  fellowships: fetchFellowships,
  grants: fetchGrants,
};

async function processPageOpportunities(page, api, context) {
  const { blocks, breadcrumbs = [] } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1].url;
  const opportunitiesBlocks = await Promise.all(
    blocks
      .filter((b) => b.slug === "opportunities")
      .map(async (b) => {
        const { featured: originalFeatured, items: originalItems } = b;
        let featured = null;
        if (originalFeatured) {
          const foundValue = originalFeatured?.value;
          if (foundValue) {
            const collection = originalFeatured.relationTo;
            featured = {
              ...processOpportunity(
                foundValue,
                `${pageUrl}/${collection}`,
                api,
                context
              ),
              variant: collection,
              slug: "featured-post",
            };
          }
        }
        const items = await Promise.all(
          originalItems.map(async ({ collection, ...other }) => {
            let found = null;
            const collectionPageUrl = `${pageUrl}/${collection}`;
            const fetchCollection =
              fetchOpportunitiesCollectionFunctionMap[collection];
            if (fetchCollection) {
              found = await fetchCollection(collectionPageUrl, api, context);
            }

            return { ...other, ...found, collection };
          })
        );

        return { ...b, featured, items };
      })
  );
  if (!opportunitiesBlocks.length) {
    return page;
  }

  // Maintain block order
  opportunitiesBlocks.forEach((ob) => {
    const i = blocks.findIndex((b) => b.id === ob.id);
    blocks[i] = ob;
  });
  return page;
}

export async function processPageFellowships(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageOpportunitiesPost(page, api, context);
  }

  // For now, we don't show /opportunities/fellowships by itself
  return null;
}

export async function processPageGrants(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processPageOpportunitiesPost(page, api, context);
  }

  // For now, we don't show /opportunities/grants by itself
  return null;
}

export default processPageOpportunities;
