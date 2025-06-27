export async function getPost(api, slug) {
  const { docs } = await api.getCollection("posts", {
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!docs?.length) {
    return null;
  }

  const [post] = docs;

  const { meta, ...other } = post;

  const blocks = [
    {
      ...other,
      blockType: "content",
    },
  ];
  return {
    blocks,
    meta,
  };
}

export async function getPosts(api, parentPage, options) {
  const {
    docs: posts,
    totalPages,
    page,
  } = await api.getCollection("posts", {
    where: {
      "parent.slug": {
        equals: parentPage,
      },
    },
    ...options,
  });

  return {
    posts,
    totalPages,
    page,
  };
}

export default undefined;
