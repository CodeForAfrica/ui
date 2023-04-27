const Datasets = {
  slug: "datasets",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "organizationId",
      label: {
        en: "Organization ID",
        fr: "ID de l'organisation",
        pt: "ID da organização",
      },
      type: "text",
      required: true,
    },
  ],
};

export default Datasets;
