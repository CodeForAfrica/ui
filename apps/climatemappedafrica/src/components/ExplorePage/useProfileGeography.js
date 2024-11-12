import useSWR from "swr";

import fetchJson from "@/climatemappedafrica/utils/fetchJson";

function useProfileGeography(shouldFetch, hurumapUrl, profileId) {
  const fetcher = (code) => {
    return fetchJson(
      `/api/hurumap/geographies/${code}?profileId=${profileId}&BASE_URL=${hurumapUrl}`,
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
