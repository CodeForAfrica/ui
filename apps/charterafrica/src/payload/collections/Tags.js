import slug from "../fields/slug";

const Tags = {
  slug: "tag",
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
      localized: true,
      required: true,
    },
    slug(),
  ],
};

export default Tags;
