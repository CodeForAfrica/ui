import { useEffect, useState } from "react";

function useIntelligenceBriefings(
  page,
  params,
  initialBriefings,
  initialCount,
  skip,
) {
  const [briefings, setBriefings] = useState(initialBriefings);
  const [pagination, setPagination] = useState({
    page,
    count: initialCount,
  });

  useEffect(() => {
    if (skip) {
      return;
    }

    async function fetchBriefings() {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("page", page);

        if (params?.limit) {
          searchParams.set("limit", params.limit);
        }
        if (params?.briefingsType) {
          searchParams.set("type", params.briefingsType);
        }
        if (params?.search) {
          searchParams.set("search", params.search);
        }

        const response = await fetch(
          `/api/intelligence-briefings?${searchParams.toString()}`,
        );
        const data = await response.json();

        setBriefings(data.docs || []);
        setPagination({
          page: data.page || page,
          count: data.totalPages || 1,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch intelligence briefings:", error);
      }
    }

    fetchBriefings();
  }, [page, params, skip]);

  return { briefings: skip ? initialBriefings : briefings, pagination };
}

export default useIntelligenceBriefings;
