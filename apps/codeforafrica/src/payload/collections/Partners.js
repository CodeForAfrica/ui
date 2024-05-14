import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../fields/image";
import richText from "../fields/richText";
import slug from "../fields/slug";
import socialLinks from "../fields/socialLinks";
import nestCollectionUnderPage from "../utils/nestCollectionUnderPage";

const Partners = {
  slug: "partners",
  labels: {
    singular: {
      en: "Partner",
    },
    plural: {
      en: "Partners",
    },
  },
  admin: {
    defaultColumns: ["name", "updatedAt"],
    enableRichTextLink: false,
    group: "Organisation",
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
      editor: slateEditor(),
    }),
    socialLinks({
      name: "connect",
      label: "Social Media Links",
      required: false,
      localized: true,
    }),
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("partners")],
  },
};
export default Partners;
