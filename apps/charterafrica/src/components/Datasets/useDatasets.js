import useSWR from "swr";

import queryString from "@/charterafrica/utils/datasets/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDatasets(query, pathname, locale) {
  const qs = queryString(query);
  const qsPath = qs ? `?${qs}&path=${pathname}` : `?path=${pathname}`;
  const pathAndLocale = qsPath
    ? `${qsPath}&locale=${locale}`
    : `?locale=${locale}`;
  const { data, error } = useSWR(
    `/api/v1/resources/datasets${pathAndLocale}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useDatasets;
