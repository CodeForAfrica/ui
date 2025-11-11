import { getReports } from "@/trustlab/utils/reports";

async function reportsList(block, api) {
  const { blockType: slug } = block;
  const reports = await getReports(api, {
    limit: block.reportsPerPage || 9,
    sort: block.sortBy || "-createdAt",
  });
  return {
    ...block,
    slug,
    ...reports,
  };
}
export default reportsList;
