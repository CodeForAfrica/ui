import api from "../payload";

export const ORGANIZATION_COLLECTION = "github-organisations";
export const PEOPLE_COLLECTION = "github-people";
export const TOOL_COLLECTION = "tool-github";

export const createOrganization = async (toCreate) => {
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: {
      github: { equals: toCreate.github },
    },
  });
  if (docs.length) {
    const data = await api.updateCollection(ORGANIZATION_COLLECTION, {
      id: docs[0]?.id,
      ...toCreate,
      updatedAt: new Date(),
    });
    return data;
  }
  const data = await api.createCollection(ORGANIZATION_COLLECTION, toCreate);
  return data;
};

export const createPerson = async (toCreate) => {
  const { docs } = await api.getCollection(PEOPLE_COLLECTION, {
    where: {
      github: { equals: toCreate.github },
    },
  });
  if (docs.length) {
    const data = await api.updateCollection(PEOPLE_COLLECTION, {
      id: docs[0]?.id,
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

export const createTool = async (data) => {
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      github: { equals: data?.github },
    },
  });
  if (docs.length) {
    return docs[0];
  }
  const { organisation, people, ...rest } = data;
  const createdOrganization = organisation?.github
    ? await createOrganization(organisation)
    : null;
  const createdPeople = await bulkCreatePeople(people);
  const toCreate = {
    ...rest,
    people: createdPeople.map(({ id }) => id),
    organisation: createdOrganization?.id,
  };
  const res = await api.createCollection(TOOL_COLLECTION, toCreate);
  return res;
};

export const updateTool = async (data) => {
  const { organisation, people, id, ...rest } = data;
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      id: { equals: id },
    },
  });
  const createdOrganization = organisation?.github
    ? await createOrganization(organisation)
    : null;
  const createdPeople = await bulkCreatePeople(people);
  const toCreate = {
    ...rest,
    id,
    people: createdPeople.map((person) => person.id),
    organisation: createdOrganization?.id,
    updatedAt: new Date(),
  };
  if (docs.length) {
    const res = await api.updateCollection(TOOL_COLLECTION, toCreate);
    return res;
  }
  return data;
};
