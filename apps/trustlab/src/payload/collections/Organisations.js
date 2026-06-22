import { slug, image, richText, linkGroup } from "@commons-ui/payload/fields";

import { anyone, hasEditorAccess } from "@/trustlab/payload/access";
import blocks from "@/trustlab/payload/blocks";

const Organisations = {
  slug: "organisations",
  labels: {
    singular: "Organisation",
    plural: "Organisations",
  },
  admin: {
    group: "Publication",
    useAsTitle: "name",
    defaultColumns: ["name", "createdAt"],
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
      type: "text",
      required: true,
      localized: true,
    },
    richText({
      name: "description",
      localized: true,
    }),
    image({
      overrides: {
        name: "image",
      },
    }),
    {
      name: "includeLink",
      type: "checkbox",
      required: true,
      defaultValue: true, // We already have some links in CMS so default to showing them
    },
    linkGroup({
      linkConfig: {
        disableLabel: true,
        disableOpenInNewTab: true,
      },
      overrides: {
        required: false,
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.includeLink),
        },
      },
    }),
    {
      name: "blocks",
      type: "blocks",
      blocks,
    },
    slug({
      fieldToUse: "name",
      overrides: {
        required: true,
      },
    }),
  ],
};

export default Organisations;
