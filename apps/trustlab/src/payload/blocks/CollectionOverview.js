function CollectionOverview(
  slug,
  imageURL,
  collections,
  {
    fields: additionalFields = [],
    minRows = 1,
    maxRows = 3,
    required = true,
    titleLabel = "Title",
    collectionLabel = "Resources",
    hasLinkButton = true,
    linkLabelDefaultValue = "Learn more",
    ...others
  },
) {
  const fields = [
    {
      name: "title",
      label: titleLabel,
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "collections",
      label: collectionLabel,
      type: "relationship",
      relationTo: collections,
      hasMany: true,
      minRows,
      maxRows,
      required,
      localized: true,
    },
  ];

  if (hasLinkButton) {
    fields.push({
      name: "linkLabel",
      type: "text",
      required: true,
      defaultValue: linkLabelDefaultValue,
      localized: true,
    });
  }

  fields.push(...additionalFields);

  return {
    slug,
    imageURL,
    fields,
    ...others,
  };
}

export default CollectionOverview;
