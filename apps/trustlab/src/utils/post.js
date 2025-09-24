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

  const { title, meta, content, isApplication } = post;

  const postImageOverviewBlockIndex = content.findIndex(
    (block) => block.blockType === "page-overview",
  );
  if (postImageOverviewBlockIndex !== -1) {
    content[postImageOverviewBlockIndex] = {
      ...content[postImageOverviewBlockIndex],
      date: post.deadline ? formatDate(post.deadline) : null,
      isClosed: post.deadline ? new Date(post.deadline) < new Date() : null,
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
    title,
    blocks,
    meta,
    link: post.link,
    isApplication,
    applicationLink: post?.applicationLink ?? null,
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
      publishedOn: post.publishedOn
        ? formatDate(post.publishedOn, { locale: "en-GB", includeTime: false })
        : null,
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
