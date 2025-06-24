import formatDate from "@/trustlab/payload/utils/formatDate";
import { getPosts } from "@/trustlab/utils/post";

async function postList(block, api, context) {
  const { blockType, deadlineLabel, linkLabel } = block;
  const { params } = context;
  const { slugs } = params;
  const [page] = slugs;

  const { posts = [] } = await getPosts(api, page, {
    limit: -1,
  });

  return {
    blockType,
    slug: blockType,
    deadlineLabel,
    linkLabel,
    posts: posts.map((post) => ({
      id: post.id,
      deadline: post?.deadline
        ? formatDate(post?.deadline, { locale: "en-GB", includeTime: false })
        : null,
      excerpt: post.excerpt,
      image: {
        src: post.image.src,
        alt: post.image.alt,
      },
      href: post.link?.href || "",
      title: post?.title,
    })),
  };
}

export default postList;
