function RelationshipOverview(
  slug,
  imageURL,
  {
    relationTo,
    fields = [],
    minRows = 1,
    maxRows = 3,
    required = true,
    titleLabel = "Title",
    relationshipLabel = "Resources",
    linkLabelDefaultValue = "Learn more",
    ...others
  },
) {
  return {
    slug,
    imageURL,
    fields: [
      {
        name: "title",
        label: titleLabel,
        type: "text",
        required: true,
        localized: true,
      },
      {
        name: "relationship",
        label: relationshipLabel,
        type: "relationship",
        relationTo,
        hasMany: true,
        minRows,
        maxRows,
        required,
        localized: true,
      },
      {
        name: "linkLabel",
        type: "text",
        required: true,
        defaultValue: linkLabelDefaultValue,
        localized: true,
      },
      ...fields,
    ],
    ...others,
  };
}

export default RelationshipOverview;
