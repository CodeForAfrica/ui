async function spotlightOverview(block, api) {
  const { blockType, items: collectionList = [], ...other } = block;
  // Query the selected posts so that the posts collection's read access
  // decides which ones are shown (e.g. no unpublished posts for visitors), and
  // so that the afterRead hook populates their links.
  const ids = collectionList
    .map(({ item }) => item?.id ?? item)
    .filter(Boolean);
  const { docs: posts } = ids.length
    ? await api.getCollection("posts", {
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
