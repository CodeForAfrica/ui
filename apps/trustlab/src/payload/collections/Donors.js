import {
  image,
  richText,
  socialLinks,
  slug,
  linkGroup,
} from "@commons-ui/payload/fields";

import { anyone, hasEditorAccess } from "@/trustlab/payload/access";

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
    group: "Project",
    useAsTitle: "name",
  },
  access: {
    read: anyone,
    create: hasEditorAccess,
    update: hasEditorAccess,
    delete: hasEditorAccess,
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
    linkGroup({
      overrides: {
        name: "link",
        required: true,
      },
    }),
    socialLinks({
      name: "connect",
      label: "Social Media Links",
      required: false,
      localized: true,
    }),
  ],
};
export default Donors;
