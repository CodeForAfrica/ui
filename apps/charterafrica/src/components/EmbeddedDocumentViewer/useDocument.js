import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useDocument(url, options) {
  const params = new URLSearchParams(options);
  const newUrl = `${url}?${params.toString()}`;
  const { data, error } = useSWR(
    `/api/v1/opportunities/consultation/documents?url=${newUrl}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDocument;
