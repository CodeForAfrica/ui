export default function getDocumentsQuery(context, options) {
  const { query = {} } = context;
  const { contributor = true, page = 1, per_page: perPage = 8 } = query;

  return { contributor, page, per_page: perPage, ...options };
}
