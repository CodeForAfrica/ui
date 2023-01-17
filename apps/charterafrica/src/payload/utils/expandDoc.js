const expandDoc = async (doc, req) => {
  const { relationTo, value: originalValue } = doc;
  if (typeof originalValue === "string") {
    const value = await req.payload.findByID({
      collection: relationTo,
      id: originalValue,
    });

    return { ...doc, value };
  }
  return doc;
};

export default expandDoc;
