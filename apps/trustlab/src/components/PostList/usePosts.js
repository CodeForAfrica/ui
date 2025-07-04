import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const usePosts = (page, path, initialPosts, initialCount) => {
  const { data, error } = useSWR(
    `/api/v1/posts?path=${path}&page=${page}`,
    fetcher,
  );

  if (!data) {
    return {
      posts: initialPosts || [],
      pagination: { count: initialCount, page },
      isLoading: true,
    };
  }

  return {
    posts: data?.posts || [],
    pagination: data?.pagination || { count: 0, page: 1 },
    isLoading: !error && !data,
  };
};

export default usePosts;
