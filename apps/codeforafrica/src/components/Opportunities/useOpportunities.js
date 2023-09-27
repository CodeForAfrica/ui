import useSWR from "swr";

import useFilterQuery from "@/codeforafrica/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useOpportunities(query) {
  const queryParams = useFilterQuery(query);
  const path = "opportunities";
  const queryParamsWithPath = queryParams
    ? `${queryParams}&path=${path}`
    : `?path=${path}`;
  const { data, error } = useSWR(
    `/api/v1/posts${queryParamsWithPath}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useOpportunities;
