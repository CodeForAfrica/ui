async function ourExplainers(block, _, api, context) {
  if (block) {
    const collection = await api.getCollection("explainers", context);
    const explainers = collection.docs || null;

    return {
      block: { ...block, explainers },
    };
  }
  return { block };
}

export default ourExplainers;
