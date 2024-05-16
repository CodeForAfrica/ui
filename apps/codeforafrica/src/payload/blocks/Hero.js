import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../fields/image";
import richText from "../fields/richText";

const Hero = {
  slug: "hero",
  imageURL: "/images/cms/blocks/hero.jpg",
  imageAltText: "Used in homepage.",
  fields: [
    richText({
      name: "title",
      required: true,
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold"],
        },
      }),
    }),
    {
      name: "messages",
      type: "array",
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "message",
          type: "text",
        },
      ],
      admin: {
        className: "array-field-nested",
        components: {
          RowLabel: ({ data, index }) => {
            return data?.message || `Message ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
    {
      name: "subtitle",
      label: "Description",
      type: "text",
      required: true,
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default Hero;
