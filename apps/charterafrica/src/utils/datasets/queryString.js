const DEFAULT_SORTING = "metadata_modified desc";
const DEFAULT_COUNTRY = "Countries";
const DEFAULT_TAG = "Themes";

/**
 * This function is important not only because it's reusable on both
 * FE and BE, but also to ensure the order of params is maintained. This
 * is important to tools like SWR which uses URL as key and hence we'd
 * like to make sure /path?q1=1&q2=2 is always created that way and never
 * /path?q2=2&q1=1.
 */
function queryString(query = {}) {
  const searchParams = new URLSearchParams();
  const { countries, page, sort, tags, q } = query;
  if (q) {
    searchParams.append("q", q);
  }
  if (sort && sort !== DEFAULT_SORTING) {
    searchParams.append("sort", sort);
  }
  if (countries && countries !== DEFAULT_COUNTRY) {
    searchParams.append("countries", countries.join(","));
  }
  if (tags && tags !== DEFAULT_TAG) {
    searchParams.append("tags", tags.join(","));
  }

  if (page && page !== 0) {
    searchParams.append("page", page);
  }

  return searchParams.toString() || "";
}

export { DEFAULT_SORTING, DEFAULT_COUNTRY, DEFAULT_TAG };

export default queryString;
