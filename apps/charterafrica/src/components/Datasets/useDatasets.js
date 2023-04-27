import queryString from "@/charterafrica/utils/datasets/queryString";
// import useSWR from "swr";

function useDatasets(query) {
  const qs = queryString(query);
  // console.log("qs", qs);
  // const separator = qs ? "?" : "";
  //   const { data, error } = useSWR(`/api/v1/datasets${separator}${qs}`, fetcher);

  //   return {
  //     data,
  //     isLoading: !error && !data,
  //     error,
  //   };
  return qs;
}

export default useDatasets;
