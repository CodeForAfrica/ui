import { getMembers } from "@/codeforafrica/lib/data/utils/members";

async function getTags(fields, docs) {
  return fields.map((field) => {
    if (field === "team") {
      const teamTags =
        [
          "All",
          ...new Set(docs.map((item) => item[field].name).filter(Boolean)),
        ] ?? [];

      return {
        field: "Team",
        tags: teamTags.map((slug) => ({ label: slug, value: slug, slug })),
      };
    }
    const uniqueTags =
      ["All", ...new Set(docs.map((item) => item[field]).filter(Boolean))] ??
      [];
    return {
      field: `${field.charAt(0).toUpperCase()}${field.slice(1)}`,
      tags: uniqueTags.map((slug) => ({ label: slug, value: slug, slug })),
    };
  });
}

async function ourTeam(block, api, context) {
  const { query } = context;
  const data = await getMembers(api, query);
  const { docs = [] } = await api.getCollection("members");
  const tags = await getTags(block?.fields, docs);

  return {
    ...block,
    ...data,
    slug: block.blockType,
    tags,
  };
}

export default ourTeam;
