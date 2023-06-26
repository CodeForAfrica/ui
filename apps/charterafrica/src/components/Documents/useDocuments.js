import useSWR from "swr";

import queryString from "@/charterafrica/utils/documents/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDocuments(q, options, pathname) {
  const qs = queryString({ ...options, q, pathname });
  const separator = qs ? "?" : "";
  const { data, error } = useSWR(
    `/api/v1/resources/documents${separator}${qs}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useDocuments;
