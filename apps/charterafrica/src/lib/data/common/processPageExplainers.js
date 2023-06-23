async function processPageExplainers(page, api, context) {
  const collection = await api.getCollection("explainers", context);
  const explainers = collection.docs || null;
  const { title, blocks } = page;
  if (explainers?.length) {
    blocks.push({
      id: page.id,
      explainers,
      slug: "explainers",
      title,
    });
  }

  return page;
}

export default processPageExplainers;
