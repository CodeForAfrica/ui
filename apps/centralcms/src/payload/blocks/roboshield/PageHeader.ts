import { Block } from "payload";

export const PageHeader: Block = {
  slug: "page-header",
  labels: {
    singular: "Page Header",
    plural: "Page Header",
  },
  imageURL: "/images/cms/blocks/roboshield/pageHeader.png",
  imageAltText: "Used in About page.",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: true,
    },
  ],
};
