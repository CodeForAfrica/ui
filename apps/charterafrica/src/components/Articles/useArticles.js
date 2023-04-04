import useSWR from "swr";

import queryString from "@/charterafrica/utils/articles/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useArticles(collection, query) {
  const qs = queryString(query);
  const separator = qs ? "?" : "";
  const { data, error } = useSWR(
    `/api/v1/knowledge/${collection}${separator}${qs}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useArticles;
