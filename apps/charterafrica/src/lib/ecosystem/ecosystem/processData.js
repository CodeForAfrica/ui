import * as Sentry from "@sentry/nextjs";

import {
  createCollection,
  bulkMarkDeleted,
} from "@/charterafrica/lib/ecosystem/payload";
import api from "@/charterafrica/lib/payload";
import {
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/payload/utils/constants";

async function getCollectionPerAirtableId(collection, ids) {
  if (!ids || !ids?.length) {
    return [];
  }
  const { docs } = await api.getCollection(collection, {
    where: {
      airtableId: {
        in: ids?.join(","),
      },
    },
  });
  return docs.map(({ id }) => id);
}

export async function processContributors(airtableData, config) {
  const { contributors } = airtableData;
  await bulkMarkDeleted(CONTRIBUTORS_COLLECTION, contributors);
  const toProcess = airtableData?.contributors?.map((item) => {
    return createCollection(CONTRIBUTORS_COLLECTION, item, config);
  });
  return Promise.allSettled(toProcess);
}

export async function processOrganisations(airtableData, config) {
  const { organisations } = airtableData;
  await bulkMarkDeleted(ORGANIZATION_COLLECTION, organisations);
  const toProcess = airtableData?.organisations?.map(async (item) => {
    try {
      const rawTools = item?.en?.tools || [];
      const tools = await getCollectionPerAirtableId(
        CONTRIBUTORS_COLLECTION,
        rawTools
      );
      const toCreate = {
        en: {
          ...item.en,
          tools,
        },
        pt: {
          ...item.pt,
          tools,
        },
        fr: {
          ...item.fr,
          tools,
        },
      };
      return createCollection(ORGANIZATION_COLLECTION, toCreate, config);
    } catch (error) {
      Sentry.captureException(error.message);
      return null;
    }
  });
  return Promise.allSettled(toProcess);
}

export async function processTools(airtableData, config) {
  const { tools } = airtableData;
  await bulkMarkDeleted(TOOL_COLLECTION, tools);
  const toProcess = airtableData?.tools?.map(async (item) => {
    const contrib = item?.en?.contributors || [];
    const contributors = await getCollectionPerAirtableId(
      CONTRIBUTORS_COLLECTION,
      contrib
    );
    const toCreate = {
      en: {
        ...item.en,
        contributors,
      },
      pt: {
        ...item.pt,
        contributors,
      },
      fr: {
        ...item.fr,
        contributors,
      },
    };
    return createCollection(TOOL_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(toProcess);
}
