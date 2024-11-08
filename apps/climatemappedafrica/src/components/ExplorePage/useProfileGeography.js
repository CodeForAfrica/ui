import useSWR from "swr";

import fetchJson from "@/climatemappedafrica/utils/fetchJson";

function useProfileGeography(shouldFetch, hurumapConfig) {
  const { BASE_URL, profileId } = hurumapConfig;
  const fetcher = (code) => {
    return fetchJson(
      `/api/hurumap/geographies/${code}?profileId=${profileId}&BASE_URL=${BASE_URL}`,
    );
  };
  const { data, error } = useSWR(shouldFetch, fetcher);

  return {
    data,
    isLoading: shouldFetch() && !(error || data),
    isError: error,
  };
}

export default useProfileGeography;
