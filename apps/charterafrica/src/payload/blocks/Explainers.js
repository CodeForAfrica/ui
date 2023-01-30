const Explainers = {
  slug: "our-explainers",
  labels: {
    singular: {
      en: "Explainer",
      fr: "Explicative",
      pt: "Explicador",
    },
    plural: {
      en: "Explainers",
      fr: "Explicatives",
      pt: "Explicadores",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        fr: "Titre",
        pt: "Título",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "bannerTitle",
      label: {
        en: "Banner Title",
        fr: "Titre de la bannière",
        pt: "Título do banner",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "explainers",
      label: {
        en: "Explainers",
        fr: "Explicatives",
        pt: "Explicadores",
      },
      type: "relationship",
      relationTo: "explainers",
      hasMany: true,
      required: true,
      admin: {
        isSortable: true,
      },
    },
  ],
};

export default Explainers;
