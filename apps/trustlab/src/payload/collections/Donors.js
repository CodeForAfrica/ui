import {
  image,
  richText,
  socialLinks,
  nestCollectionUnderPage,
  slug,
} from "@commons-ui/payload";

const Donors = {
  slug: "donors",
  labels: {
    singular: {
      en: "Donor",
    },
    plural: {
      en: "Donors",
    },
  },
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Consortium",
    useAsTitle: "name",
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
    image({
      overrides: {
        name: "logo",
        required: true,
        localized: true,
      },
    }),
    richText({
      name: "description",
      required: true,
      localized: true,
    }),
    socialLinks({
      name: "connect",
      label: "Social Media Links",
      required: false,
      localized: true,
    }),
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("donors")],
  },
};
export default Donors;
