import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const ALL_TAG = "All";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { tag, page, q } = query;
  if (tag && !equalsIgnoreCase(tag, ALL_TAG)) {
    searchParams.append("tag", tag);
  }
  if (page > 1) {
    searchParams.append("page", page);
  }
  if (q) {
    searchParams.append("q", q);
  }
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export { ALL_TAG };

export default useFilterQuery;
