export default function getDocumentsQuery(page, context, options) {
  const { query = {} } = context;
  const {
    contributor = true,
    page: pageNumber = 1,
    per_page: perPage = 8,
  } = query;
  const { breadcrumbs = [] } = page;
  const pathname = breadcrumbs[breadcrumbs.length - 1]?.url;

  return {
    contributor,
    page: pageNumber,
    pathname,
    per_page: perPage,
    ...options,
  };
}
