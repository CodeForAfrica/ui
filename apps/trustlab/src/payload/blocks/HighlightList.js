import { richText } from "@commons-ui/payload";

const HighlightList = {
  slug: "highlight-list",
  imageURL: "/images/cms/blocks/highlight-list.png",
  imageAltText: "Highlight List block.",
  labels: { singular: "Highlight List", plural: "Highlight Lists" },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: "Title",
    },
    {
      name: "items",
      type: "array",
      label: "Items",
      minRows: 1,
      maxRows: 3,
      localized: true,
      required: true,
      fields: [richText({ name: "content", required: true, localized: true })],
    },
  ],
};

export default HighlightList;
