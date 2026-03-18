import { slug, image, richText, linkGroup } from "@commons-ui/payload";

import {
  ActionBanner,
  PageHeader,
  PageOverview,
  HighlightList,
  Testimonial,
} from "@/trustlab/payload/blocks";

const ParticipatingOrganizations = {
  slug: "participating-organizations",
  labels: {
    singular: "Participating Organization",
    plural: "Participating Organizations",
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
        name: "website",
        label: "Organization Link",
      },
    }),
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        ActionBanner,
        PageHeader,
        PageOverview,
        HighlightList,
        Testimonial,
      ],
    },
    slug({
      fieldToUse: "name",
    }),
  ],
};

export default ParticipatingOrganizations;
