import { slug, image, richText, linkGroup } from "@commons-ui/payload";

import {
  OpportunityList,
  ActionBanner,
  PageHeader,
  PageOverview,
  HighlightList,
  Testimonial,
  ParticipatingOrganizationList,
  Gallery,
  HorizontalGallery,
  FeatureList,
  ContentOverview,
} from "@/trustlab/payload/blocks";

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
        name: "website",
        label: "Organization Link",
      },
    }),
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        ActionBanner,
        OpportunityList,
        PageHeader,
        PageOverview,
        HighlightList,
        Testimonial,
        ParticipatingOrganizationList,
        Gallery,
        HorizontalGallery,
        FeatureList,
        ContentOverview,
      ],
    },
    slug({
      fieldToUse: "name",
    }),
  ],
};

export default Organisations;
