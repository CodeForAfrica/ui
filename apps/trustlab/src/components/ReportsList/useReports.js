import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useReports(page, params, initialReports, initialCount, skip) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);

  if (params?.limit) {
    searchParams.set("limit", params.limit);
  }
  if (params?.reportsType) {
    searchParams.set("reportsType", params.reportsType);
  }

  ["years", "months", "reports"].forEach((key) => {
    if (params?.[key]) {
      const v = params[key];
      searchParams.set(key, Array.isArray(v) ? v.join(",") : v);
    }
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
      page: data?.page ?? page,
      count: data?.totalPages ?? initialCount,
    },
  };
}

export default useReports;
