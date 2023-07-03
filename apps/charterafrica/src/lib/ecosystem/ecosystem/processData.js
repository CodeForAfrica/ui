import {
  tool,
  organisation,
  contributor,
} from "@/charterafrica/lib/ecosystem/github";
import {
  createCollection,
  bulkMarkDeleted,
  getCollectionIdsPerAirtableId,
} from "@/charterafrica/lib/ecosystem/payload";
import api from "@/charterafrica/lib/payload";
import {
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/payload/utils/collections";

export async function processContributors(airtableData, config) {
  const { contributors } = airtableData;
  await bulkMarkDeleted(CONTRIBUTORS_COLLECTION, contributors);
  const toProcess = airtableData?.contributors?.map(async (item) => {
    const gitData = await contributor(item);
    const toCreate = { ...item, gitData };
    return createCollection(CONTRIBUTORS_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}

export async function processOrganisations(airtableData, config) {
  const { organisations } = airtableData;
  await bulkMarkDeleted(ORGANIZATION_COLLECTION, organisations);
  const toProcess = airtableData?.organisations?.map(async (item) => {
    const rawTools = item?.en?.tools || [];
    const tools = await getCollectionIdsPerAirtableId(
      CONTRIBUTORS_COLLECTION,
      rawTools
    );
    const gitData = await organisation(item);
    const toCreate = {
      ...item,
      ...gitData,
      tools,
    };
    return createCollection(ORGANIZATION_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}

export async function processTools(airtableData, config) {
  const { tools } = airtableData;
  await bulkMarkDeleted(TOOL_COLLECTION, tools);
  const toProcess = airtableData?.tools?.map(async (item) => {
    const contrib = item?.en?.contributors || [];
    const contributors = await getCollectionIdsPerAirtableId(
      CONTRIBUTORS_COLLECTION,
      contrib
    );
    const gitData = await tool(item);
    const toCreate = {
      ...item,
      ...gitData,
      contributors,
    };
    return createCollection(TOOL_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}

export async function updateContributor() {
  const { docs } = await api.getCollection(CONTRIBUTORS_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const updated = await contributor(item, true);
    return api.updateCollection(CONTRIBUTORS_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

export async function updateOrganisation() {
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const updated = await organisation(item, true);
    return api.updateCollection(ORGANIZATION_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

export async function updateTool() {
  const { docs } = await api.getCollection(TOOL_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const updated = await tool(item, true);
    return api.updateCollection(TOOL_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}
