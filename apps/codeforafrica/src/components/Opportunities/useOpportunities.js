import useSWR from "swr";

import useFilterQuery from "@/codeforafrica/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useOpportunities(params, primaryTag) {
  const queryParams = useFilterQuery(params);
  const query = queryParams
    ? `${queryParams}&primaryTag=${primaryTag}`
    : `?primaryTag=${primaryTag}`;
  const { data, error } = useSWR(`/api/v1/posts${query}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useOpportunities;
