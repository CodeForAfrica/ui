import useSWR from "swr";

import useFilterQuery from "@/codeforafrica/components/useFilterQuery";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useMembers(query) {
  const queryParams = useFilterQuery(query);
  const { data, error } = useSWR(`/api/members${queryParams}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useMembers;
