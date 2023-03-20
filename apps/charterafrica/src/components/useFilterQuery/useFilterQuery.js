const DEFAULT_SORTING = "-publishedOn";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { locale, sort, q, page } = query;
  if (q) {
    searchParams.append("q", q);
  }
  if (sort && sort !== DEFAULT_SORTING) {
    searchParams.append("sort", sort);
  }
  if (locale) {
    searchParams.append("locale", locale);
  }
  if (page && page !== 1) {
    searchParams.append("page", page);
  }
  const queryString = searchParams.toString();
  return queryString || "";
}

export { DEFAULT_SORTING };

export default useFilterQuery;
