import { getPlaybooks } from "@/trustlab/utils/resources";

async function playbooksList(block, api) {
  const { blockType: slug, hasPagination } = block;
  const playbooks = await getPlaybooks(api, {
    limit: hasPagination ? block.playbooksPerPage || 12 : undefined,
    sort: block.sortBy || "-createdAt",
  });
  return {
    ...block,
    slug,
    ...playbooks,
  };
}
export default playbooksList;
