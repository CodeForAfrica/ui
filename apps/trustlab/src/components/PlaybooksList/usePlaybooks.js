import useListData from "@/trustlab/hooks/useListData";
import { buildQueryString } from "@/trustlab/utils/queryParams";

const usePlaybooks = (
  page,
  params,
  initialPlaybooks,
  initialCount,
  showAllPosts,
) => {
  const queryString = buildQueryString({ ...params, page });
  const { data, isBusy } = useListData(`/api/v1/playbooks?${queryString}`);

  if (!data) {
    return {
      playbooks: initialPlaybooks || [],
      pagination: { count: initialCount, page },
      isBusy,
    };
  }

  return {
    playbooks: !showAllPosts ? data?.playbooks || [] : initialPlaybooks || [],
    pagination: data?.pagination,
    isBusy,
  };
};

export default usePlaybooks;
