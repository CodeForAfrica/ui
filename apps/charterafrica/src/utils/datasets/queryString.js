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
  if (sort) {
    searchParams.append("sort", sort);
  }
  if (countries?.length > 0) {
    searchParams.append("countries", countries);
  }
  if (tags?.length > 0) {
    searchParams.append("tags", tags);
  }
  if (page > 1) {
    searchParams.append("page", page);
  }

  return searchParams.toString() || "";
}

export default queryString;
