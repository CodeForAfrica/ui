async function processPageAbout(page, api, { locale }) {
  const { blocks } = page;
  const foundIndex = blocks.findIndex(({ slug }) => slug === "our-grantees");
  if (foundIndex > -1) {
    const { sort, ...other } = blocks[foundIndex];
    const { docs } = await api.getCollection("grantees", {
      sort,
      locale,
      where: { _status: { equals: "published" } },
    });
    const grantees = docs.map((item) => ({ ...item, image: item.coverImage }));
    blocks[foundIndex] = {
      ...other,
      grantees,
    };
  }

  return page;
}

export default processPageAbout;
