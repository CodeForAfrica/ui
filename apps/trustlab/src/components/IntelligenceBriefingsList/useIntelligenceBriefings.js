import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useIntelligenceBriefings(
  page,
  params,
  initialBriefings,
  initialCount,
  skip,
) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);

  if (params?.limit) {
    searchParams.set("limit", params.limit);
  }
  if (params?.briefingsType) {
    searchParams.set("type", params.briefingsType);
  }
  if (params?.search) {
    searchParams.set("search", params.search);
  }

  const { data } = useSWR(
    skip ? null : `/api/intelligence-briefings?${searchParams.toString()}`,
    fetcher,
    {
      fallbackData: { docs: initialBriefings, page, totalPages: initialCount },
    },
  );

  return {
    briefings: skip ? initialBriefings : (data?.docs ?? initialBriefings),
    pagination: {
      page: data?.page ?? page,
      count: data?.totalPages ?? initialCount,
    },
  };
}

export default useIntelligenceBriefings;
