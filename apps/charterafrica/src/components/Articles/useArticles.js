import useSWR from "swr";

import useFilterQuery from "@/charterafrica/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useArticles(collection, query) {
  const queryParams = useFilterQuery(query);
  const { data, error } = useSWR(
    `/api/v1/knowledge/${collection}${queryParams}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useArticles;
