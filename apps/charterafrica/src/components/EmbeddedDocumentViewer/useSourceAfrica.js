import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useSourceAfrica(url, args) {
  const params = new URLSearchParams(args);
  const newUrl = `${url}?${params.toString()}`;
  const { data, error } = useSWR(`/api/sourceAfrica?url=${newUrl}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useSourceAfrica;
