import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useTags(slug) {
  const queryParams = slug ? `?slug=${slug}` : "";
  const { data } = useSWR(`/api/tags${queryParams}`, fetcher);
  const tags = data?.tags ?? [];
  return tags;
}

export default useTags;
