import useListData from "@/trustlab/hooks/useListData";
import { buildQueryString } from "@/trustlab/utils/queryParams";

const useToolkits = (page, params, initialToolkits, _, showAll) => {
  const queryString = buildQueryString({ ...params, page });
  const { data, isBusy } = useListData(`/api/v1/toolkits?${queryString}`, {
    enabled: !showAll,
  });
  if (!data?.toolkits || showAll) {
    return {
      toolkits: initialToolkits || [],
      pagination: { count: 1, page: 1 },
      isBusy,
    };
  }

  return {
    toolkits: data?.toolkits || [],
    pagination: data?.pagination,
    isBusy,
  };
};

export default useToolkits;
