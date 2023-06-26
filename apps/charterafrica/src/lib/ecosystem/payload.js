import * as Sentry from "@sentry/nextjs";

import api from "../payload";

export const ORGANIZATION_COLLECTION = "organisations";
export const CONTRIBUTORS_COLLECTION = "contributors";
export const TOOL_COLLECTION = "tools";
export const ECOSYSTEM_GLOBAL = "ecosystem-schema";

const createOrUpdate = async (collection, toCreate, locale) => {
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
      {
        ...toCreate,
        updatedAt: new Date(),
      },
      { locale }
    );
    return data;
  }
  const data = await api.createCollection(collection, toCreate, { locale });
  return data;
};

export const createCollection = async (collection, toCreate, { localized }) => {
  try {
    const { en: enToCreate, pt: ptToCreate, fr: frToCreate } = toCreate;
    if (!localized) {
      return createOrUpdate(collection, enToCreate);
    }
    const en = await createOrUpdate(collection, enToCreate, "en");
    const pt = await createOrUpdate(collection, ptToCreate, "pt");
    const fr = await createOrUpdate(collection, frToCreate, "fr");
    return { en, pt, fr };
  } catch (e) {
    Sentry.captureMessage(e.message);
    return {};
  }
};
