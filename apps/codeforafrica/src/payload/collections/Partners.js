import richText from "../fields/richText";
import slug from "../fields/slug";
import socialLinks from "../fields/socialLinks";
import nestCollectionUnderPage from "../utils/nestCollectionUnderPage";

const Partners = {
  slug: "partners",
  labels: {
    singular: {
      en: "Partner",
      fr: "Partenaire",
      pt: "Parceiro",
    },
    plural: {
      en: "Partners",
      fr: "Partenaires",
      pt: "Parceiros",
    },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "logo"],
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
      required: true,
      localized: true,
    },
    slug({ fieldToUse: "name" }),
    {
      name: "logo",
      required: true,
      type: "upload",
      relationTo: "media",
      label: {
        en: "Logo",
        pt: "Imagem",
        fr: "Image",
      },
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
      required: true,
    }),
    socialLinks({
      name: "connect",
      label: "Social Media Links",
      required: false,
    }),
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("partners")],
  },
};
export default Partners;
