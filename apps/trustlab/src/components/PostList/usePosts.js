import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const usePosts = (page, path) => {
  const { data, error } = useSWR(
    `/api/v1/posts?path=${path}&page=${page}`,
    fetcher,
  );

  return {
    posts: data?.posts || [],
    pagination: data?.pagination || { count: 0, page: 1 },
    isLoading: !error && !data,
  };
};

export default usePosts;
