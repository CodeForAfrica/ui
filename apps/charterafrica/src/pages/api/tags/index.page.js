import payload from "payload";

const getNews = async (page, slug) => {
  return payload.find({
    collection: slug,
    limit: 10,
    page,
  });
};

export default async function handler(req, res) {
  const { slug } = req.query;
  if (slug) {
    let fetchNextPage = false;
    let page = 1;
    const allTags = [];
    do {
      // eslint-disable-next-line no-await-in-loop
      const data = await getNews(page, slug);
      const { docs, hasNextPage, nextPage } = data;
      const tags =
        docs?.map((doc) => doc?.tags.map((tag) => tag.name)).flat() ?? [];
      tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
      fetchNextPage = hasNextPage;
      page = nextPage;
    } while (fetchNextPage);
    return res.status(200).json({
      tags: allTags,
    });
  }
  return res.status(404).json({
    message: "Not Found",
  });
}
