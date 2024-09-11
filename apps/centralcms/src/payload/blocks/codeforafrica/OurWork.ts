import { Block } from "payload";

const OurWork: Block = {
  slug: "our-work",
  imageURL: "/images/cms/blocks/codeforafrica/projects.png",
  imageAltText: "Our work.",
  labels: {
    singular: {
      en: "Our Work",
    },
    plural: {
      en: "Our Work",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "labels",
      type: "group",
      fields: [
        {
          name: "description",
          type: "text",
          required: true,
          defaultValue: "Description",
        },
        {
          name: "details",
          type: "text",
          required: true,
          defaultValue: "Details",
        },
        {
          name: "team",
          type: "text",
          required: true,
          defaultValue: "Team",
        },
        {
          name: "projects",
          type: "text",
          required: true,
          defaultValue: "Explore other Projects",
        },
        {
          name: "partners",
          type: "text",
          required: true,
          defaultValue: "Partners",
        },
        {
          name: "donors",
          type: "text",
          required: true,
          defaultValue: "Donors",
        },
      ],
      admin: {
        description: "Labels/Titles to be used in single project view page",
      },
    },
  ],
};

export default OurWork;
