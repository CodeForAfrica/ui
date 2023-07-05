import useSWR from "swr";

import fetchJson from "@/charterafrica/utils/fetchJson";

const fetcher = (url) => fetchJson.get(url);

function useEcosystemList(params) {
  const param = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] && params[key] !== "undefined")
      param.append(key, params[key]);
  });
  const searchParams = param.toString();
  const key = `/api/v1/resources/collections${
    searchParams ? `?${searchParams}` : ""
  }`;
  const { data, error } = useSWR(key, fetcher);
  return {
    data,
    loading: !error && !data,
    isError: error,
  };
}

export default useEcosystemList;
