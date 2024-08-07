import useSWR from "swr";

import useFilterQuery from "@/civicsignalblog/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useArticles(params, { primaryTag, featured }) {
  const queryParams = useFilterQuery(params);
  const separator = queryParams ? "" : "?";
  const filterQuery = queryParams ? `${queryParams}&` : "";
  const primaryTagQuery = `primaryTag=${primaryTag}`;
  const featuredQuery = featured ? `&featured=${featured}` : "";
  const query = `${separator}${filterQuery}${primaryTagQuery}${featuredQuery}`;
  const { data, error } = useSWR(`/api/v1/posts${query}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useArticles;
