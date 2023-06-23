/**
 * This function is important not only because it's reusable on both
 * FE and BE, but also to ensure the order of params is maintained. This
 * is important to tools like SWR which uses URL as key and hence we'd
 * like to make sure /path?q1=1&q2=2 is always created that way and never
 * /path?q2=2&q1=1.
 */
function queryString(query = {}) {
  const searchParams = new URLSearchParams();
  const {
    contributor = true,
    pathname,
    per_page: pageSize = 8,
    q,
    sort,
    search,
    ...rest
  } = query;
  if (q) {
    if (search) {
      searchParams.append("q", `${q} ${search}`);
    } else {
      searchParams.append("q", q);
    }
  }
  if (pageSize) {
    searchParams.append("per_page", pageSize);
  }
  if (sort) {
    searchParams.append("order", sort);
  }
  if (contributor !== undefined) {
    searchParams.append("contributor", contributor);
  }
  // Add the rest of params alphabetically
  if (rest) {
    Object.keys(rest)
      .sort()
      .forEach((k) => searchParams.append(k, rest[k]));
  }
  if (pathname) {
    searchParams.append("pathname", pathname);
  }

  return searchParams.toString() || "";
}

export default queryString;
