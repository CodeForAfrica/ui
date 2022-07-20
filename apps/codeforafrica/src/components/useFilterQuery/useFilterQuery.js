import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const ALL_TAG = "All";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { field, page, q, tag } = query;
  if (field) {
    searchParams.append("field", field);
  }
  if (page > 1) {
    searchParams.append("page", page);
  }
  if (q) {
    searchParams.append("q", q);
  }
  if (tag && !equalsIgnoreCase(tag, ALL_TAG)) {
    searchParams.append("tag", tag);
  }
  const queryString = searchParams.toString();
  return queryString ? `?${queryString.toLocaleLowerCase()}` : "";
}

export { ALL_TAG };

export default useFilterQuery;
