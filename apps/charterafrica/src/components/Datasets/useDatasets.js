import useSWR from "swr";

import queryString from "@/charterafrica/utils/datasets/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDatasets(query, pathname) {
  const qs = queryString(query);
  const qsPath = qs ? `?${qs}&path=${pathname}` : `?path=${pathname}`;
  const { data, error } = useSWR(
    `/api/v1/resources/datasets${qsPath}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useDatasets;
