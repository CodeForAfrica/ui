import useSWR from "swr";

import fetchJson from "@/climatemapped-africa/utils/fetchJson";

function useProfileGeography(shouldFetch) {
  const fetcher = (code) => {
    return fetchJson(`/api/hurumap/geographies/${code}`);
  };
  const { data, error } = useSWR(shouldFetch, fetcher);

  return {
    data,
    isLoading: shouldFetch() && !(error || data),
    isError: error,
  };
}

export default useProfileGeography;
