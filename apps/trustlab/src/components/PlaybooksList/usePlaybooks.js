import useSWR from "swr";

export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      if (!value.length) {
        return;
      }
      query.set(key, value.join(","));
      return;
    }
    const str = String(value).trim();
    if (str) {
      query.set(key, str);
    }
  });
  return query.toString();
};

const fetcher = (url) => fetch(url).then((res) => res.json());

const usePlaybooks = (
  page,
  params,
  initialPlaybooks,
  initialCount,
  showAllPosts,
) => {
  const queryString = buildQueryString({ ...params, page });
  const { data, isLoading } = useSWR(
    `/api/v1/playbooks?${queryString}`,
    fetcher,
  );

  if (!data) {
    return {
      playbooks: initialPlaybooks || [],
      pagination: { count: initialCount, page },
      isLoading: true,
    };
  }

  return {
    playbooks: !showAllPosts ? data?.playbooks || [] : initialPlaybooks || [],
    pagination: data?.pagination,
    isLoading,
  };
};

export default usePlaybooks;
