const Resources = {
  // TODO(kilemensi): Seems like slugs need to be globally unique.
  //                  `resources` is already used in Resources collection.
  slug: "our-resources",
  labels: {
    singular: {
      en: "Resource",
      fr: "Ressource",
      pt: "Recurso",
    },
    plural: {
      en: "Resources",
      fr: "Ressources",
      pt: "Recursos",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      required: true,
      localized: true,
    },
    {
      name: "resources",
      label: {
        en: "Resources",
        fr: "Ressources",
        pt: "Recursos",
      },
      type: "relationship",
      relationTo: "resources",
      hasMany: true,
      required: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default Resources;
