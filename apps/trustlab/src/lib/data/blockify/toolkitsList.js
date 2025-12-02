import { getToolkits } from "@/trustlab/utils/resources";

async function toolkitsList(block, api) {
  const { blockType: slug, hasPagination } = block;
  const toolkits = await getToolkits(api, {
    limit: hasPagination ? block.toolkitsPerPage || 9 : undefined,
    sort: block.sortBy || "-createdAt",
  });
  return {
    ...block,
    slug,
    ...toolkits,
  };
}
export default toolkitsList;
