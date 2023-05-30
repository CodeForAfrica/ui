const getPageUrl = async (api, slug) => {
  const { docs } = await api.getCollection("pages", {
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  const breadcrumbs = docs[0]?.breadcrumbs || [];
  return breadcrumbs[breadcrumbs.length - 1]?.url;
};

export default getPageUrl;
