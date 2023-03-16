const DEFAULT_SORTING = "-publishedOn";

function useFilterQuery(query = {}) {
  const searchParams = new URLSearchParams();
  const { locale, sort, q } = query;
  if (q) {
    searchParams.append("q", q);
  }
  if (sort && sort !== DEFAULT_SORTING) {
    searchParams.append("sort", sort);
  }
  if (locale) {
    searchParams.append("locale", locale);
  }
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export { DEFAULT_SORTING };

export default useFilterQuery;
