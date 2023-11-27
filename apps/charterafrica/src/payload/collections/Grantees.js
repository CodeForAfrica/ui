import content from "../fields/content";
import linkGroup from "../fields/linkGroup";
import publishedOn from "../fields/publishedOn";
import richText from "../fields/richText";
import slug from "../fields/slug";
import tags from "../fields/tags";

const Grantees = {
  slug: "grantees",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
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
    linkGroup({
      linkConfig: {
        disableLabel: true,
        disableOpenInNewTab: true,
        required: false,
      },
      overrides: {
        required: false,
      },
    }),
    tags(),
    content(),
    slug({ fieldToUse: "name" }),
    publishedOn(),
  ],
};

export default Grantees;
