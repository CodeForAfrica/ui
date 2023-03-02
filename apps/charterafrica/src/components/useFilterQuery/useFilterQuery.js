const ALL_TAG = "All";
const ALL_CATEGORY = "Most Recent";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { category, q, tag } = query;
  if (category && category !== decodeURIComponent(ALL_CATEGORY)) {
    searchParams.append("category", category);
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

export { ALL_TAG, ALL_CATEGORY };

export default useFilterQuery;
