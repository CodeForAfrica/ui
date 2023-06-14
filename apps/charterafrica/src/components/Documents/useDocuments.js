import useSWR from "swr";

import queryString from "@/charterafrica/utils/documents/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDocuments(q, options, pathname) {
  const qs = queryString({ ...options, q });
  const qsPath = qs ? `?${qs}&pathname=${pathname}` : `?pathname=${pathname}`;
  const { data, error } = useSWR(
    `/api/v1/opportunities/consultation/documents${qsPath}`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDocuments;
