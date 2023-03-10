import payload from "payload";

const getNews = async (page, slug) => {
  return payload.find({
    collection: slug,
    limit: 10,
    page,
  });
};

function scoreTags(tags) {
  const tagScores = {};
  tags.forEach((tag) => {
    if (tagScores[tag]) {
      tagScores[tag] += 1;
    } else {
      tagScores[tag] = 1;
    }
  });
  return tagScores;
}

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
        allTags.push(tag);
      });
      fetchNextPage = hasNextPage;
      page = nextPage;
    } while (fetchNextPage);

    const tagScores = scoreTags(allTags);
    const sortedTags = Object.keys(tagScores)
      .sort((a, b) => a.localeCompare(b))
      .sort((a, b) => tagScores[b] - tagScores[a]);

    return res.status(200).json({
      tags: sortedTags.slice(0, 4),
    });
  }
  return res.status(404).json({
    message: "Not Found",
  });
}
