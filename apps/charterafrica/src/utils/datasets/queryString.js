const DEFAULT_SORTING = "metadata_modified desc";
const DEFAULT_COUNTRY = "Countries";
const DEFAULT_TAG = "Themes";
const DEFAULT_RESOURCE = "datasets";

/**
 * This function is important not only because it's reusable on both
 * FE and BE, but also to ensure the order of params is maintained. This
 * is important to tools like SWR which uses URL as key and hence we'd
 * like to make sure /path?q1=1&q2=2 is always created that way and never
 * /path?q2=2&q1=1.
 */
function queryString(query = {}) {
  const searchParams = new URLSearchParams();
  const { countries, page, resource, sort, tags, q } = query;
  if (resource && resource !== DEFAULT_RESOURCE) {
    searchParams.append("resource", resource);
  }

  if (q) {
    searchParams.append("q", q);
  }
  if (sort && sort !== DEFAULT_SORTING) {
    searchParams.append("sort", sort);
  }
  if (countries && countries.length > 1) {
    searchParams.append(
      "countries",
      countries.filter((c) => c !== DEFAULT_COUNTRY)
    );
  }
  if (tags && tags.length > 1) {
    searchParams.append(
      "tags",
      tags.filter((t) => t !== DEFAULT_TAG)
    );
  }

  if (page && page !== 1) {
    searchParams.append("page", page);
  }

  return searchParams.toString() || "";
}

export { DEFAULT_SORTING, DEFAULT_COUNTRY, DEFAULT_TAG };

export default queryString;
