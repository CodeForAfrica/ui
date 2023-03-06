import slug from "../fields/slug";

const GranteeTags = {
  slug: "grantee-tag",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: {
        en: "Name",
        fr: "Nom",
        pt: "Nome",
      },
      type: "text",
      maxLength: 50,
      localized: true,
      required: true,
    },
    slug({ fieldToUse: "name" }),
  ],
};

export default GranteeTags;
