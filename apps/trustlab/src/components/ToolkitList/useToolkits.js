import useSWR from "swr";

import { setSearchParam } from "@/trustlab/utils/queryParams";

export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    setSearchParam(query, key, value);
  });
  return query.toString();
};

const fetcher = (url) => fetch(url).then((res) => res.json());

const useToolkits = (page, params, initialToolkits, _, showAll) => {
  const queryString = buildQueryString({ ...params, page });
  const { data, isLoading } = useSWR(
    `/api/v1/toolkits?${queryString}`,
    fetcher,
  );
  if (!data?.toolkits || showAll) {
    return {
      toolkits: initialToolkits || [],
      pagination: { count: 1, page: 1 },
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
