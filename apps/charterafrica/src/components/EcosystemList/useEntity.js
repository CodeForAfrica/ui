import useSWR from "swr";

import queryString from "@/charterafrica/utils/ecosystem/queryString";
import fetchJson from "@/charterafrica/utils/fetchJson";

const fetcher = (url) => fetchJson.get(url);

function useEntity(params) {
  const searchParams = queryString(params);
  const key = `/api/v1/resources/ecosystem/${searchParams}`;
  const { data, error } = useSWR(key, fetcher);
  return {
    data,
    loading: !error && !data,
    isError: error,
  };
}

export default useEntity;
