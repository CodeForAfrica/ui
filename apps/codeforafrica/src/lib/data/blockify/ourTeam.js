import { getMembers } from "@/codeforafrica/lib/data/utils/members";

async function ourTeam(block, api, context) {
  const { query } = context;
  const data = await getMembers(api, query);
  const { docs = [] } = await api.getCollection("members");
  const tags = block?.fields.map((field) => {
    const uniqueTags =
      [...new Set(docs.map((item) => item[field]).filter(Boolean))] ?? [];
    return {
      field: `${field.charAt(0).toUpperCase()}${field.slice(1)}`,
      tags: uniqueTags,
    };
  });

  return {
    ...block,
    ...data,
    slug: block.blockType,
    tags,
  };
}

export default ourTeam;
