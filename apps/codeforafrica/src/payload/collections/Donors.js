import image from "../fields/image";
import slug from "../fields/slug";

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
    defaultColumns: ["name", "slug", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: {
        en: "Name",
      },
      type: "text",
      required: true,
    },
    slug({ fieldToUse: "name" }),
    image({
      overrides: {
        name: "logo",
        required: true,
      },
    }),
  ],
};

export default Donors;
