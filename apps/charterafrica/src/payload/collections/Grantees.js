import { content } from "../fields/post";
import richText from "../fields/richText";
import slug from "../fields/slug";

const Grantees = {
  slug: "grantees",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
  },
  access: {
    read: () => true,
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
    {
      name: "coverImage",
      label: {
        en: "Cover Image",
        pt: "Imagem de capa",
        fr: "Image de couverture",
      },
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    richText({
      name: "description",
      label: {
        en: "Description",
        fr: "La description",
        pt: "Descrição",
      },
      localized: true,
      admin: {
        elements: ["leaves"],
      },
    }),
    {
      name: "tags",
      required: true,
      type: "relationship",
      relationTo: "grantee-tag",
      hasMany: true,
    },
    content(),
    slug({ fieldToUse: "name" }),
  ],
};

export default Grantees;
