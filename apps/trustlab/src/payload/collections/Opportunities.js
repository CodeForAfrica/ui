import { image, appendPathnameToCollection, slug } from "@commons-ui/payload";

import blocks from "@/trustlab/payload/blocks";

const pageByType = {
  "intelligence-briefing": "intelligence-briefings",
  baraza: "barazas",
  incubator: "incubators",
};

async function appendPathnameToOpportunities({ doc, req }) {
  const parentSlug = pageByType[doc.type];
  if (!parentSlug) {
    return doc;
  }
  return appendPathnameToCollection(parentSlug)({ doc, req });
}

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
      name: "date",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "dd-MM-yyyy",
        },
        description: "Date of the opportunity event",
      },
    },
    {
      name: "blocks",
      type: "blocks",
      blocks,
    },
    slug({
      fieldToUse: "title",
    }),
  ],
  hooks: {
    afterRead: [appendPathnameToOpportunities],
  },
};

export default Opportunities;
