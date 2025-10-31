import { linkGroup } from "@commons-ui/payload";

const Spotlight = {
  slug: "spotlight",
  imageURL: "/images/cms/blocks/spotlight.png",
  imageAltText: "Spotlight Items",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "items",
      type: "array",
      label: "Spotlight Items",
      minRows: 3,
      maxRows: 12,
      required: true,
      fields: [
        {
          name: "item",
          label: "Spotlight Item",
          type: "relationship",
          relationTo: "posts",
          required: true,
          localized: true,
        },
        {
          name: "title",
          type: "text",
          localized: true,
        },
        linkGroup({
          overrides: {
            name: "buttonLink",
            label: "Button Link",
            required: false,
          },
          linkConfig: {
            required: false,
          },
        }),
      ],
    },
  ],
};

export default Spotlight;
