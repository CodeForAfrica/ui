import useSWR from "swr";

export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      if (!value.length) {
        return;
      }
      query.set(key, value.join(","));
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

const useToolkits = (page, params, initialToolkits, initialCount, showAll) => {
  const queryString = buildQueryString({ ...params, page });
  const { data, isLoading } = useSWR(
    `/api/v1/toolkits?${queryString}`,
    fetcher,
  );
  if (!data?.toolkits) {
    return {
      toolkits: initialToolkits || [],
      pagination: { count: 3, page: 1 },
      isLoading: true,
    };
  }

  return {
    toolkits: !showAll ? data?.toolkits || [] : initialToolkits || [],
    pagination: data?.pagination,
    isLoading,
  };
};

export default useToolkits;
