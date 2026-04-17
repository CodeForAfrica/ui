import { getReports } from "@/trustlab/utils/reports";

async function reportsList(block, api) {
  const {
    blockType: slug,
    reportsType,
    hasPagination,
    defaultSort = null,
  } = block;
  const reports = await getReports(api, {
    limit: hasPagination ? block.reportsPerPage || 12 : undefined,
    sort: defaultSort || "-date",
    where: {
      reportType: { equals: reportsType },
    },
  });
  return {
    ...block,
    slug,
    ...reports,
  };
}
export default reportsList;
