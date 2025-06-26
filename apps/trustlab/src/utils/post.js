import { formatDate } from ".";

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

  const { meta, content } = post;

  const postImageOverviewBlockIndex = content.findIndex(
    (block) => block.blockType === "page-overview",
  );
  if (postImageOverviewBlockIndex !== -1) {
    content[postImageOverviewBlockIndex] = {
      ...content[postImageOverviewBlockIndex],
      date: formatDate(post.deadline),
      applicationActive: post.deadline && new Date(post.deadline) > new Date(),
    };
  }
  const blocks = [
    {
      slug: "page-header",
      blockType: "page-header",
      backgroundColor: "#02041C",
      textColor: "#ffffff",
      title: post.title,
      description: post.excerpt,
      id: post.id,
    },
    ...content,
  ];
  return {
    blocks,
    meta,
  };
}

export async function getPosts(api, parentPage) {
  const { slug } = parentPage;

  const {
    docs: posts,
    totalPages,
    page,
  } = await api.getCollection("posts", {
    where: {
      parent: {
        equals: slug,
      },
    },
  });

  return {
    posts,
    totalPages,
    page,
  };
}

export default undefined;
