import useSWR from "swr";

import useFilterQuery from "@/codeforafrica/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useArticles(params, { primaryTag, featured }) {
  const queryParams = useFilterQuery(params);
  const query = queryParams
    ? `${queryParams}&primaryTag=${primaryTag}${
        featured ? `&featured=${featured}` : ""
      }`
    : `?primaryTag=${primaryTag}${featured ? `&featured=${featured}` : ""}`;
  const { data, error } = useSWR(`/api/v1/posts${query}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useArticles;
