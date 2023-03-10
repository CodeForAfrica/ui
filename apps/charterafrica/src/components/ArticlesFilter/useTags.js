import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useTags() {
  const { data } = useSWR(`/api/tags`, fetcher);
  const tags = data?.tags ?? [];
  return tags;
}

export default useTags;
