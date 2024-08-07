import equalsIgnoreCase from "@/civicsignalblog/utils/equalsIgnoreCase";

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
  if (tag.slug && !equalsIgnoreCase(tag.slug, ALL_TAG)) {
    searchParams.append("tag", tag.slug);
  }
  const queryString = searchParams.toString();
  return queryString ? `?${queryString.toLocaleLowerCase()}` : "";
}

export { ALL_TAG };

export default useFilterQuery;
