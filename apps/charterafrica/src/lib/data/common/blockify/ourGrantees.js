async function ourGrantees(block, api, { locale }) {
  if (block) {
    const { sort } = block;
    const { docs } = await api.getCollection("grantees", {
      sort,
      locale,
      where: { _status: { equals: "published" } },
    });
    const grantees = docs.map((item) => ({ ...item, image: item.coverImage }));

    return {
      ...block,
      grantees,
    };
  }
  return block;
}

export default ourGrantees;
