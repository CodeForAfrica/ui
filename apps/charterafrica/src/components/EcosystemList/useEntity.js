import useSWR from "swr";

import fetchJson from "@/charterafrica/utils/fetchJson";

const fetcher = (url) => fetchJson.get(url);

function queryString(params) {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] && params[key] !== "undefined")
      query.append(key, params[key]);
  });
  const qString = query.toString();
  return qString ? `?${qString}` : "";
}

function useEntity(params) {
  const searchParams = queryString(params);
  const key = `/api/v1/resources/collections${searchParams}`;
  const { data, error } = useSWR(key, fetcher);
  return {
    data,
    loading: !error && !data,
    isError: error,
  };
}

export default useEntity;
