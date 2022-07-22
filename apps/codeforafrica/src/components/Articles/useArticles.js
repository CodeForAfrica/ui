import useSWR from "swr";

import useFilterQuery from "@/codeforafrica/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useArticles(query) {
  const queryParams = useFilterQuery(query);
  const { data, error } = useSWR(`/api/stories${queryParams}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useArticles;
