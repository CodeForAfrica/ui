import { slug, image, richText, linkGroup } from "@commons-ui/payload";

import blocks from "@/trustlab/payload/blocks";

const Organisations = {
  slug: "organisations",
  labels: {
    singular: "Organization",
    plural: "Organizations",
  },
  admin: {
    group: "Publication",
    useAsTitle: "name",
    defaultColumns: ["name", "createdAt"],
  },
  access: {
    read: () => true,
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
    linkGroup({
      overrides: {
        label: "Organization Link",
      },
    }),
    {
      name: "blocks",
      type: "blocks",
      blocks,
    },
    slug({
      fieldToUse: "name",
    }),
  ],
};

export default Organisations;
