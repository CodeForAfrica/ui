import { FetchError } from "../../utils/fetchJson";
import api from "../payload";

export const ORGANIZATION_COLLECTION = "organisations";
export const PEOPLE_COLLECTION = "people";
export const TOOL_COLLECTION = "tools";
export const DIGITAL_DEMOCRACY_ECOSYSTEM = "digital-democracy-ecosystem-config";

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

const bulkCreatePeople = async (contributors = []) => {
  const promises = contributors?.map((contributor) =>
    createPerson(contributor)
  );
  return Promise.all(promises);
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
      people: createdPeople.map((person) => person.id),
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
    throw new FetchError(error.message, error, 500);
  }
};
