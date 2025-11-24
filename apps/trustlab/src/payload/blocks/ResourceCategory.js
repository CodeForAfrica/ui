import { image, richText, linkGroup } from "@commons-ui/payload";

const ResourceCategory = {
  slug: "resource-category",
  labels: { singular: "Resource Category", plural: "Resource Categories" },
  imageURL: "/images/cms/blocks/resource-category.png",
  fields: [
    {
      name: "categories",
      type: "array",
      label: "Resource Category Items",
      admin: { description: "Resource Category items" },
      fields: [
        image({ name: "image" }),
        {
          name: "title",
          type: "text",
          required: true,
          localized: true,
        },
        richText({
          name: "description",
          localized: true,
        }),
        linkGroup({
          overrides: {
            name: "link",
          },
        }),
      ],
    },
  ],
};

export default ResourceCategory;
