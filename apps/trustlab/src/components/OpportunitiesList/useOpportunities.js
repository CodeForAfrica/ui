import useSWR from "swr";

import { setSearchParam } from "@/trustlab/utils/queryParams";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Allowlist of params forwarded to the API. Intentionally excludes `page`
// (set separately) and keeps arbitrary URL params from being proxied through.
// Keep in sync with the /api/v1/opportunities handler.
const QUERY_PARAM_KEYS = [
  "limit",
  "type",
  "location",
  "date",
  "search",
  "sort",
  "opportunity",
  "year",
  "month",
];

function useOpportunities(
  page,
  params,
  initialItems,
  initialCount,
  skip,
  apiEndpoint = "/api/v1/opportunities",
) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);

  QUERY_PARAM_KEYS.forEach((key) => {
    setSearchParam(searchParams, key, params?.[key]);
  });

  const { data } = useSWR(
    skip ? null : `${apiEndpoint}?${searchParams.toString()}`,
    fetcher,
    { fallbackData: { docs: initialItems, page, totalPages: initialCount } },
  );

  return {
    items: skip ? initialItems : (data?.docs ?? initialItems),
    pagination: {
      page: data?.page ?? page,
      count: data?.totalPages ?? initialCount,
    },
  };
}

export default useOpportunities;
