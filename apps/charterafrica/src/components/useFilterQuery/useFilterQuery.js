const ALL_TAG = "All";
const DEFAULT_SORTING = "Most Recent";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { sort, query: searchQuery, tag } = query;
  if (sort && sort !== decodeURIComponent(DEFAULT_SORTING)) {
    searchParams.append("sort", sort);
  }
  if (searchQuery) {
    searchParams.append("query", searchQuery);
  }
  if (tag) {
    const tags = tag.filter((t) => t !== ALL_TAG);
    if (tags.length) {
      searchParams.append("tag", tags.join(","));
    }
  }
  const queryString = searchParams.toString();
  return queryString ? `${queryString.toLocaleLowerCase()}` : "";
}

export { ALL_TAG, DEFAULT_SORTING };

export default useFilterQuery;
