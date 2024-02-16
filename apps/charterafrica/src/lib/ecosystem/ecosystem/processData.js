import github from "@/charterafrica/lib/ecosystem/github";
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

export async function prepareContributors(airtableData, config) {
  const { contributors } = airtableData;
  await bulkMarkDeleted(CONTRIBUTORS_COLLECTION, contributors);
  const toProcess = airtableData?.contributors?.map(async (item) => {
    const rawOrganisations = item?.organisations || [];
    const organisations = await getCollectionIdsPerAirtableId(
      ORGANIZATION_COLLECTION,
      rawOrganisations,
    );
    const toCreate = {
      ...item,
      organisations,
    };
    return createCollection(CONTRIBUTORS_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}

export async function prepareOrganisations(airtableData, config) {
  const { organisations } = airtableData;
  await bulkMarkDeleted(ORGANIZATION_COLLECTION, organisations);
  const toProcess = airtableData?.organisations?.map(async (item) => {
    const rawTools = item?.tools || [];
    const tools = await getCollectionIdsPerAirtableId(
      TOOL_COLLECTION,
      rawTools,
    );
    const toCreate = {
      ...item,
      tools,
    };
    return createCollection(ORGANIZATION_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}

export async function prepareTools(airtableData, config) {
  const { tools } = airtableData;
  await bulkMarkDeleted(TOOL_COLLECTION, tools);
  const toProcess = airtableData?.tools?.map(async (item) => {
    const contrib = item?.contributors || [];
    const contributors = await getCollectionIdsPerAirtableId(
      CONTRIBUTORS_COLLECTION,
      contrib,
    );
    const toCreate = {
      ...item,
      contributors,
    };
    return createCollection(TOOL_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}

export async function updateContributor(forceUpdate) {
  const { docs } = await api.getCollection(CONTRIBUTORS_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const itemToFetch = forceUpdate ? { ...item, eTag: null } : item;
    const updated = await github.fetchContributor(itemToFetch);
    return api.updateCollection(CONTRIBUTORS_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

export async function updateOrganisation(forceUpdate) {
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const itemToFetch = forceUpdate ? { ...item, eTag: null } : item;
    const updated = await github.fetchOrganisation(itemToFetch);
    return api.updateCollection(ORGANIZATION_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

export async function updateTool(forceUpdate) {
  const { docs } = await api.getCollection(TOOL_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const itemToFetch = forceUpdate ? { ...item, eTag: null } : item;
    const updated = await github.fetchTool(itemToFetch);
    return api.updateCollection(TOOL_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}
