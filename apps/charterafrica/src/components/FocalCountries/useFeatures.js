import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useFeatures() {
  const { data, error } = useSWR(`/data/features.json`, fetcher);

  return {
    data,
    isError: error,
    isLoading: !(error || data),
  };
}

export default useFeatures;
