import useSWR from "swr";

import fetchJson from "@/climatemappedafrica/utils/fetchJson";

function useProfileGeography(shouldFetch, hurumapAPIURL, profileId) {
  const fetcher = (code) => {
    return fetchJson(
      `/api/hurumap/geographies/${code}?profileId=${profileId}&BASE_URL=${hurumapAPIURL}`,
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
