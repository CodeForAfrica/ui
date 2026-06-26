import useSWR from "swr";

import { setSearchParam } from "@/trustlab/utils/queryParams";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Allowlist of params forwarded to the API. Intentionally excludes `page`
// (set separately) and keeps arbitrary URL params from being proxied through.
// Keep in sync with the /api/v1/reports handler.
const QUERY_PARAM_KEYS = [
  "limit",
  "reportsType",
  "sort",
  "search",
  "year",
  "month",
  "report",
];

function useReports(page, params, initialReports, initialCount, skip) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);

  QUERY_PARAM_KEYS.forEach((key) => {
    setSearchParam(searchParams, key, params?.[key]);
  });

  const { data } = useSWR(
    skip ? null : `/api/v1/reports?${searchParams.toString()}`,
    fetcher,
    {
      fallbackData: { reports: initialReports, page, totalPages: initialCount },
    },
  );

  return {
    reports: skip ? initialReports : (data?.reports ?? initialReports),
    pagination: {
      page: data?.pagination?.page ?? page,
      count: data?.pagination?.count ?? initialCount,
    },
  };
}

export default useReports;
