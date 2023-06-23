import useSWR from "swr";

import queryString from "@/charterafrica/utils/documents/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDocuments(q, options, pathname, pinnedDocuments) {
  const qs = queryString({ ...options, q, pathname, pinnedDocuments });
  const separator = qs ? "?" : "";
  const { data, error } = useSWR(
    `/api/v1/opportunities/consultation/documents${separator}${qs}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useDocuments;
