const ALL_TAG = "All";
const DEFAULT_SORTING = "Most Recent";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { sort, q, tag } = query;
  if (sort && sort !== decodeURIComponent(DEFAULT_SORTING)) {
    searchParams.append("sort", sort);
  }
  if (q) {
    searchParams.append("q", q);
  }
  if (tag && tag !== ALL_TAG) {
    searchParams.append("tag", tag);
  }
  const queryString = searchParams.toString();
  return queryString ? `${queryString.toLocaleLowerCase()}` : "";
}

export { ALL_TAG, DEFAULT_SORTING };

export default useFilterQuery;
