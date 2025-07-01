export async function getResources(api, options) {
  const {
    docs: resources,
    totalPages,
    page,
  } = await api.getCollection("resources", {
    ...options,
  });

  return {
    resources,
    totalPages,
    page,
  };
}

export async function getResource(api, slug) {
  const { docs } = await api.getCollection("resources", {
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!docs?.length) {
    return null;
  }

  const [resource] = docs;

  const { meta, content } = resource;

  const blocks = [
    {
      slug: "page-header",
      blockType: "page-header",
      backgroundColor: "#02041C",
      textColor: "#ffffff",
      title: resource.title,
      description: resource.excerpt,
      id: resource.id,
    },
    ...content,
  ];

  return {
    blocks,
    meta,
  };
}
