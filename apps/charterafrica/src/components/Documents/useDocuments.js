import useSWR from "swr";

import queryString from "@/charterafrica/utils/documents/queryString";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDocuments(q, options) {
  const qs = queryString({ ...options, q });
  const separator = qs ? "?" : "";
  const { data, error } = useSWR(
    `/api/v1/opportunities/consultation/documents${separator}${qs}`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDocuments;
