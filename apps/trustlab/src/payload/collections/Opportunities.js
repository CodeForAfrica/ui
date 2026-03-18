import { slug, image } from "@commons-ui/payload";

import {
  OpportunityList,
  ActionBanner,
  PageHeader,
  PageOverview,
  HighlightList,
  Testimonial,
  ParticipatingOrganizationList,
} from "@/trustlab/payload/blocks";

const Opportunities = {
  slug: "opportunities",
  labels: { singular: "Opportunity", plural: "Opportunities" },
  admin: {
    group: "Publication",
    useAsTitle: "title",
    defaultColumns: ["title", "type"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Incubator", value: "incubator" },
        { label: "Intelligence Briefing", value: "intelligence-briefing" },
        { label: "Baraza", value: "baraza" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: {
        description:
          "Short caption displayed above the title (e.g., 'Hate Speech | Report')",
      },
    },
    {
      name: "location",
      type: "text",
      localized: true,
    },
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
      ],
    },
    slug({
      fieldToUse: "title",
    }),
  ],
};

export default Opportunities;
