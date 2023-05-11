import { FetchError } from "../../utils/fetchJson";
import api from "../payload";

export const ORGANIZATION_COLLECTION = "organisations";
export const PEOPLE_COLLECTION = "people";
export const TOOL_COLLECTION = "tools";
export const DIGITAL_DEMOCRACY_ECOSYSTEM = "digital-democracy-ecosystem-config";

function removeDuplicatesByKey(arr, key) {
  const uniqueKeys = new Set();
  return (arr || []).filter((obj) => {
    if (!obj) {
      return false;
    }
    const objKey = obj[key];
    if (!uniqueKeys.has(objKey)) {
      uniqueKeys.add(objKey);
      return true;
    }
    return false;
  });
}

export const createOrganization = async (toCreate) => {
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: {
      externalId: { equals: toCreate.externalId },
    },
  });
  if (docs.length) {
    const data = await api.updateCollection(
      ORGANIZATION_COLLECTION,
      docs[0]?.id,
      {
        ...toCreate,
        updatedAt: new Date(),
      }
    );
    return data;
  }
  const data = await api.createCollection(ORGANIZATION_COLLECTION, toCreate);
  return data;
};

export const createPerson = async (toCreate) => {
  const { docs } = await api.getCollection(PEOPLE_COLLECTION, {
    where: {
      externalId: { equals: toCreate.externalId },
    },
  });
  if (docs.length) {
    const data = await api.updateCollection(PEOPLE_COLLECTION, docs[0]?.id, {
      ...toCreate,
      updatedAt: new Date(),
    });
    return data;
  }
  const data = await api.createCollection(PEOPLE_COLLECTION, toCreate);
  return data;
};

export const bulkCreatePeople = async (contributors = []) => {
  const promises = contributors?.map(async (contributor) => {
    return createPerson(contributor);
  });
  const results = await Promise.all(promises);
  return results;
};

export const bulkCreateOrganisations = async (organisations = []) => {
  const promises = organisations?.map(async (organisation) => {
    return createOrganization(organisation);
  });
  const results = await Promise.all(promises);
  return results;
};

export const updateOrCreateTool = async (data) => {
  try {
    const { organisation, people, id, ...rest } = data;
    const createdOrganization = organisation?.externalId
      ? await createOrganization(organisation)
      : null;
    const createdPeople = await bulkCreatePeople(people);
    const toCreate = {
      ...rest,
      people: createdPeople.map((person) => person?.id),
      organisation: createdOrganization?.id,
      updatedAt: new Date(),
    };
    const queryArgs = {
      where: {
        ...(id ? { id: { equals: id } } : {}),
        externalId: data?.externalId ? { equals: data?.externalId } : undefined,
      },
    };
    const { docs } = await api.getCollection(TOOL_COLLECTION, queryArgs);
    if (docs?.length) {
      if (id) {
        const res = await api.updateCollection(TOOL_COLLECTION, id, toCreate);
        return res;
      }
      return docs[0];
    }
    const res = await api.createCollection(TOOL_COLLECTION, toCreate);
    return res;
  } catch (error) {
    throw new FetchError(error.message, data, 500);
  }
};

export const bulkCreateTools = async (tools) => {
  const organisationsToCreate = removeDuplicatesByKey(
    tools.map(({ organisation }) => organisation),
    "externalId"
  ).filter((org) => !!org.externalId);
  await bulkCreateOrganisations(organisationsToCreate);
  const peopleToCreate = removeDuplicatesByKey(
    tools.flatMap((obj) => obj.people),
    "externalId"
  ).filter((person) => !!person?.externalId);
  await bulkCreatePeople(peopleToCreate);
  const toBulkCreate = tools.map(async (item) => {
    return updateOrCreateTool(item);
  });
  const allSettled = await Promise.allSettled(toBulkCreate);
  const completed = allSettled
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value);
  const rejected = allSettled.filter((p) => p.status === "rejected");
  return { completed, rejected };
};
