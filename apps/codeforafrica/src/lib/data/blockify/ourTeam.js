import { getMembers } from "@/codeforafrica/lib/data/utils/members";
import { sortTags } from "@/codeforafrica/lib/data/utils/tags";

function getTeamTags(docs) {
  const tags = sortTags(docs.map((item) => item.team).filter(Boolean));
  return [{ name: "All", slug: "All" }, ...tags];
}

function getCountryTags(docs) {
  const tags = sortTags(
    docs
      .map(({ country }) => (country ? { name: country, slug: country } : null))
      .filter(Boolean),
  );
  return [{ name: "All", slug: "All" }, ...tags];
}

async function getTags(fields, docs) {
  return fields.map((field) => {
    if (field === "team") {
      return {
        field: "Team",
        tags: getTeamTags(docs),
      };
    }
    return {
      field: "Country",
      tags: getCountryTags(docs),
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
