import * as Sentry from "@sentry/nextjs";

import localize from "@/charterafrica/lib/ecosystem/utils";
import api from "@/charterafrica/lib/payload";

export async function updateOrCreate(collection, toCreate, locale) {
  try {
    const { docs } = await api.getCollection(collection, {
      locale,
      where: {
        airtableId: { equals: toCreate.airtableId },
      },
    });
    if (docs.length) {
      const data = await api.updateCollection(
        collection,
        docs[0]?.id,
        toCreate,
        { locale }
      );
      return data;
    }
    const data = await api.createCollection(collection, toCreate, { locale });
    return data;
  } catch (e) {
    Sentry.captureMessage(e.message);
    return null;
  }
}

export async function createCollection(collection, toCreate, { localized }) {
  try {
    const locales = localized ? ["en", "pt", "fr"] : ["en"];
    const localizedData = localize(toCreate || {}, locales);
    if (!localizedData) {
      return null;
    }
    if (!localized) {
      return updateOrCreate(collection, localizedData?.en);
    }
    const promises = Object.keys(localizedData).map((key) =>
      updateOrCreate(collection, localizedData?.[key], key)
    );
    return Promise.all(promises);
  } catch (e) {
    Sentry.captureMessage(e.message);
    return null;
  }
}

export async function bulkMarkDeleted(collection, fromSource) {
  try {
    const dataIds = fromSource.map((item) => item?.airtableId).join(",");
    const { docs: toDelete } = await api.getCollection(collection, {
      where: {
        airtableId: {
          not_in: dataIds,
        },
      },
    });
    Promise.all(
      toDelete.map(async ({ id }) => {
        try {
          await api.updateCollection(collection, id, {
            deletedAt: new Date(),
          });
        } catch (error) {
          Sentry.captureMessage(error.message);
        }
      })
    );
  } catch (e) {
    Sentry.captureMessage(e.message);
  }
}

export async function getCollectionIdsPerAirtableId(collection, ids) {
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
