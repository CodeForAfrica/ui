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

  const { title, excerpt: description, image, ...meta } = post;

  const postMeta = {
    title,
    description,
    image,
    ...meta,
  };

  const blocks = [
    {
      ...post,
      blockType: "content",
    },
  ];
  return {
    blocks,
    meta: postMeta,
  };
}

export default undefined;
