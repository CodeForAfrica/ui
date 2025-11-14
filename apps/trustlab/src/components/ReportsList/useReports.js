import useSWR from "swr";

// function to return only existing params as query string takes in params object
export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return;
      }
      const joined = value.join(",");
      if (joined) {
        query.set(key, joined);
      }
      return;
    }
    const str = String(value).trim();
    if (str) {
      query.set(key, str);
    }
  });
  return query.toString();
};

const fetcher = (url) => fetch(url).then((res) => res.json());
const useReports = (
  page,
  params,
  initialReports,
  initialCount,
  showAllPosts,
) => {
  // convert params object to query string
  const queryString = buildQueryString({ ...params, page });
  const { data, isLoading } = useSWR(`/api/v1/reports?${queryString}`, fetcher);

  if (!data) {
    return {
      reports: initialReports || [],
      pagination: { count: initialCount, page },
      isLoading: true,
    };
  }

  return {
    reports: !showAllPosts ? data?.reports || [] : initialReports || [],
    pagination: data?.pagination,
    isLoading,
  };
};

export default useReports;
