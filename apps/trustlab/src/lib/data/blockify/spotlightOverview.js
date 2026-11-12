async function spotlightOverview(block, api, context) {
  const { blockType, items: collectionList = [], ...other } = block;
  // Query the selected posts rather than use the populated ones: posts reached
  // through a relationship don't get their parent page (`maxDepth: 1`), so
  // their links can't be built. The query also applies the posts read access
  // (e.g. no unpublished posts for visitors) and shows drafts in preview.
  const ids = collectionList
    .map(({ item }) => item?.id ?? item)
    .filter(Boolean);
  const { docs: posts } = ids.length
    ? await api.getCollection("posts", {
        draft: Boolean(context?.draftMode),
        where: {
          id: {
            in: ids.join(","),
          },
        },
      })
    : { docs: [] };
  const postsById = new Map(posts.map((post) => [post.id, post]));

  const items = collectionList
    .map(({ item, title: cardTitle, buttonLink = null }) => ({
      post: postsById.get(item?.id ?? item),
      cardTitle,
      buttonLink,
    }))
    .filter(({ post }) => post)
    .map(({ post, cardTitle, buttonLink }) => {
      const { excerpt, image = {}, title, tags = [], id, link } = post;
      const [firstTag] = tags;

      return {
        excerpt,
        image: {
          src: image?.src || "",
          alt: image?.alt || "",
        },
        title,
        cardTitle: cardTitle || "",
        tag: firstTag?.name || null,
        id,
        href: link?.href || null,
        buttonLink,
      };
    });

  return {
    ...other,
    items,
    blockType,
    slug: blockType,
  };
}

export default spotlightOverview;
