import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useBarazas(page, params, initialBarazas, initialCount, skip) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);

  if (params?.limit) {
    searchParams.set("limit", params.limit);
  }
  if (params?.barazasType) {
    searchParams.set("type", params.barazasType);
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

  const { data } = useSWR(
    skip ? null : `/api/barazas?${searchParams.toString()}`,
    fetcher,
    { fallbackData: { docs: initialBarazas, page, totalPages: initialCount } },
  );

  return {
    barazas: skip ? initialBarazas : (data?.docs ?? initialBarazas),
    pagination: {
      page: data?.page ?? page,
      count: data?.totalPages ?? initialCount,
    },
  };
}

export default useBarazas;
