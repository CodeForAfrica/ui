import getOpportunities from "@/trustlab/lib/data/getOpportunities";

async function getOpportunityListBlock(block, api, options = {}) {
  const { locale } = options;
  const {
    opportunityType = null,
    itemsPerPage = 12,
    hasPagination = false,
    hasFilters = false,
    filters,
    ...rest
  } = block;

  const result = await getOpportunities(api, {
    page: 1,
    limit: hasPagination ? itemsPerPage : 100,
    type: opportunityType,
    locale,
  });

  const allOpportunities = await getOpportunities(api, {
    page: 1,
    limit: 1000,
    type: opportunityType,
    locale,
  });

  // Process filters to populate dynamic options
  const processedFilters = await Promise.all(
    (filters || []).map(async (filter) => {
      if (filter.type === "location") {
        // Fetch all opportunities to extract unique locations
        const uniqueLocations = [
          ...new Set(
            allOpportunities.docs.map((doc) => doc.location).filter(Boolean),
          ),
        ].sort();

        return {
          ...filter,
          options: uniqueLocations.map((loc) => ({
            label: loc,
            value: loc,
          })),
        };
      }

      if (filter.type === "opportunity") {
        return {
          ...filter,
          options: allOpportunities.docs.map((opp) => ({
            label: opp.title,
            value: opp.id,
          })),
        };
      }

      return filter;
    }),
  );

  return {
    ...rest,
    slug: "opportunity-list",
    items: result.docs,
    itemsType: opportunityType,
    itemsPerPage,
    hasPagination,
    hasFilters,
    filters: processedFilters,
    pagination: {
      page: result.page,
      count: result.totalPages,
    },
    apiEndpoint: "/api/v1/opportunities",
  };
}

export default getOpportunityListBlock;
