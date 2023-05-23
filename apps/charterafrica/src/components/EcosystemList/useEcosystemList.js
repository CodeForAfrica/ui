import useSWR from "swr";

import fetchJson from "@/charterafrica/utils/fetchJson";

const fetcher = (url) => fetchJson.get(url);

function useEcosystemList(params) {
  const { collection, slugs, ...rest } = params;
  const searchParams = new URLSearchParams(rest).toString();
  const key = `/api/v1/resources/collections/${collection}?${searchParams}`;
  const { data, error } = useSWR(key, fetcher);
  return {
    data,
    loading: !error && !data,
    isError: error,
  };
}

export default useEcosystemList;
