import useSWR from "swr";

import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const ALL_CATEGORIES = "All";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useProject(query = {}) {
  const searchParams = new URLSearchParams();
  const { category, page, q } = query;
  if (category && !equalsIgnoreCase(query.category, ALL_CATEGORIES)) {
    searchParams.append("category", category);
  }
  if (page > 1) {
    searchParams.append("page", page);
  }
  if (q) {
    searchParams.append("q", q);
  }
  const queryString = searchParams.toString();
  const queryParams = queryString ? `?${queryString}` : "";
  const { data, error } = useSWR(`/api/projects${queryParams}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export { ALL_CATEGORIES };

export default useProject;
