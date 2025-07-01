import formatDate from "@/trustlab/payload/utils/formatDate";

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

const formatPosts = (posts) => {
  return posts.map((post) => {
    const isClosed = new Date(post.deadline) < new Date();
    return {
      id: post.id,
      deadline: post?.deadline
        ? formatDate(post?.deadline, { locale: "en-GB", includeTime: false })
        : null,
      excerpt: post.excerpt,
      image: {
        src: post.image.src,
        alt: post.image.alt,
      },
      isClosed,
      href: post.link?.href || "",
      title: post?.title,
    };
  });
};

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
    posts: formatPosts(posts),
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export default undefined;
