import {
  processTool,
  processOrganisation,
  processContributor,
} from "./processData";

import api from "@/charterafrica/lib/payload";
import {
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/payload/utils/collections";

export async function tool(airtableData, update) {
  if (update) {
    return processTool(airtableData);
  }
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processTool(airtableData);
}

export async function organisation(airtableData, update) {
  if (update) {
    return processOrganisation(airtableData);
  }
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processOrganisation(airtableData);
}

export async function contributor(airtableData, update) {
  if (update) {
    return processContributor(airtableData);
  }
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(CONTRIBUTORS_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processContributor(airtableData);
}
