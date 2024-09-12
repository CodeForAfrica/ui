import image from "@/payload/fields/image";
import richText from "@/payload/fields/RichText";
import slug from "@/payload/fields/slug";
import socialLinks from "@/payload/fields/socialLinks";
import nestCollectionUnderPage from "@/payload/utilities/nestCollectionUnderPage";
import type { CollectionConfig } from "payload";
import { canRead } from "@/payload/access/codeforafrica";

const Partners: CollectionConfig = {
  slug: "partners",
  access: {
    read: canRead,
    create: () => true,
    update: () => true,
  },
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
    afterRead: [nestCollectionUnderPage("partners")],
  },
};
export default Partners;
