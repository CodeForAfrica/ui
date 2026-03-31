import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useOpportunities(
  page,
  params,
  initialItems,
  initialCount,
  skip,
  apiEndpoint = "/api/v1/opportunities",
) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);

  if (params?.limit) {
    searchParams.set("limit", params.limit);
  }
  if (params?.type) {
    searchParams.set("type", params.type);
  }
  if (params?.location) {
    searchParams.set("location", params.location);
  }
  if (params?.date) {
    searchParams.set("date", params.date);
  }
  if (params?.search) {
    searchParams.set("search", params.search);
  }
  if (params?.opportunity) {
    searchParams.set("opportunity", params.opportunity);
  }
  if (params?.year) {
    searchParams.set("year", params.year);
  }
  if (params?.month) {
    searchParams.set("month", params.month);
  }

  const { data } = useSWR(
    skip ? null : `${apiEndpoint}?${searchParams.toString()}`,
    fetcher,
    { fallbackData: { docs: initialItems, page, totalPages: initialCount } },
  );

  return {
    items: skip ? initialItems : (data?.docs ?? initialItems),
    pagination: {
      page: data?.page ?? page,
      count: data?.totalPages ?? initialCount,
    },
  };
}

export default useOpportunities;
