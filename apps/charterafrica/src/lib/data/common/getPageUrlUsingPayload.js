const getPageUrlUsingPayload = async (payload, slug) => {
  const collection = "pages";
  const options = {
    where: {
      slug: {
        equals: slug,
      },
    },
  };

  const { docs } = await payload.find({
    limit: 0,
    ...options,
    collection,
  });

  const breadcrumbs = docs[0]?.breadcrumbs || [];
  return breadcrumbs[breadcrumbs.length - 1]?.url;
};

export default getPageUrlUsingPayload;
