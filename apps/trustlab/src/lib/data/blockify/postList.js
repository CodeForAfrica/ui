import formatDate from "@/trustlab/payload/utils/formatDate";
import { getPosts } from "@/trustlab/utils/post";

async function postList(block, api, context) {
  const { blockType, closedLabel, deadlineLabel, linkLabel } = block;
  const { params } = context;
  const { slugs } = params;
  const [page] = slugs;

  const { posts = [] } = await getPosts(api, page, {
    limit: -1,
  });

  return {
    blockType,
    slug: blockType,
    posts: posts.map((post) => {
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
        linkLabel: isClosed ? closedLabel : linkLabel,
        deadlineLabel,
      };
    }),
  };
}

export default postList;
