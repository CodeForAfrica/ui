import { countries } from "@/codeforafrica/lib/data/json/countries";
import { getMembers } from "@/codeforafrica/lib/data/utils/members";
import { sortTags, ALL_TAG } from "@/codeforafrica/lib/data/utils/tags";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const getCountryFromCode = (alpha3) =>
  countries.find((c) => equalsIgnoreCase(c.alpha3, alpha3)) ?? null;

function getTeamTags(docs) {
  const tags = sortTags(docs.map((item) => item.team).filter(Boolean));
  return [ALL_TAG, ...tags];
}

function getCountryTags(docs) {
  const tags = sortTags(
    docs.map(({ country }) => getCountryFromCode(country)).filter(Boolean),
  );
  return [ALL_TAG, ...tags];
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
