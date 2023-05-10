const OpenAfrica = {
  slug: "openAfrica",
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
      //   hooks: {
      //     afterChange: [updateDatasetsStatistics],
      //   },
    },
  ],
};

export default OpenAfrica;
