import { useEffect, useState } from "react";

function useBarazas(page, params, initialBarazas, initialCount, skip) {
  const [barazas, setBarazas] = useState(initialBarazas);
  const [pagination, setPagination] = useState({
    page,
    count: initialCount,
  });

  useEffect(() => {
    if (skip) {
      return;
    }

    async function fetchBarazas() {
      try {
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

        const response = await fetch(`/api/barazas?${searchParams.toString()}`);
        const data = await response.json();

        setBarazas(data.docs || []);
        setPagination({
          page: data.page || page,
          count: data.totalPages || 1,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch barazas:", error);
      }
    }

    fetchBarazas();
  }, [page, params, skip]);

  return { barazas, pagination };
}

export default useBarazas;
