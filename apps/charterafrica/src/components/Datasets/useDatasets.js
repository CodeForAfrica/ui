import useSWR from "swr";

import queryString from "@/charterafrica/utils/datasets/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDatasets(query, pathname) {
  const qs = queryString({ ...query, pathname });
  const separator = qs ? "?" : "";
  const { data, error } = useSWR(
    `/api/v1/resources/datasets${separator}${qs}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useDatasets;
