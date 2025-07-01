export async function getHelplines(api, options) {
  const {
    docs: helplines,
    totalPages,
    page,
  } = await api.getCollection("helplines", {
    ...options,
  });

  return {
    helplines,
    totalPages,
    page,
  };
}

export async function getHelpline(api, slug) {
  const { docs } = await api.getCollection("helplines", {
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!docs?.length) {
    return null;
  }

  const [helpline] = docs;

  const { meta, content } = helpline;

  const blocks = [
    {
      slug: "page-header",
      blockType: "page-header",
      backgroundColor: "#02041C",
      textColor: "#ffffff",
      title: helpline.title,
      description: helpline.excerpt,
      id: helpline.id,
    },
    ...content,
  ];

  return {
    blocks,
    meta,
  };
}
