import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useProject(query) {
  const queryString = Object.keys(query)
    .reduce((acc, key) => {
      if (query[key]) {
        acc.append(key, query[key]);
      }
      return acc;
    }, new URLSearchParams())
    .toString();
  const queryParams = queryString ? `?${queryString}` : "";
  const { data, error } = useSWR(`/api/projects${queryParams}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useProject;
