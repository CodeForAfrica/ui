const OpenAfrica = {
  slug: "openAfrica",
  label: "openAfrica",
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

export default OpenAfrica;
