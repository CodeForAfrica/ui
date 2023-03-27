import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDocuments(groups, options) {
  const groupsString = groups.map((group) => `group:${group}`).join(" ");
  const params = {
    q: groupsString,
    type: "search",
    ...options,
  };
  const paramsString = new URLSearchParams(params).toString();
  const { data, error } = useSWR(
    `/api/v1/opportunities/consultation/documents?${paramsString}`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDocuments;
