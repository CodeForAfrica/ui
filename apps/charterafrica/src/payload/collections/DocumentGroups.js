import slug from "../fields/slug";

const DocumentGroups = {
  slug: "documentGroups",
  admin: {
    useAsTitle: "group",
    defaultColumns: ["group", "updatedAt"],
  },
  access: {
    read: () => true, // Everyone can read Pages
  },
  fields: [
    {
      name: "group",
      label: {
        en: "Group ID",
        fr: "ID du groupe",
        pt: "ID do grupo",
      },
      type: "text",
      localized: true,
      required: true,
      unique: true,
    },
    slug({ fieldToUse: "group" }),
  ],
};

export default DocumentGroups;
