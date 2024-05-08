import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "../fields/richText";

const Error = {
  slug: "error",
  imageURL: "/images/cms/blocks/error.png",
  imageAltText: "Used to describe errors in error pages.",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    richText({
      name: "subtitle",
      editor: slateEditor({
        admin: {
          elements: ["link"],
        },
      }),
    }),
  ],
};

export default Error;
