import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../fields/image";
import linkGroup from "../fields/links/linkGroup";
import richText from "../fields/richText";

const HowItWorks = {
  slug: "how-it-works",
  imageURL: "/images/cms/blocks/how-it-works.png",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    richText({
      name: "description",
      label: {
        en: "Description",
      },
      editor: slateEditor({
        admin: {
          elements: ["link"],
          leaves: ["bold", "code", "italic", "underline"],
        },
      }),
      required: true,
      localized: true,
    }),
    {
      name: "video",
      type: "group",
      fields: [
        {
          name: "url",
          type: "text",
          label: "Video Source",
          required: true,
        },
        {
          name: "type",
          type: "text",
          required: true,
          defaultValue: "video/youtube",
          admin: {
            description: "The type of video. e.g. video/mp4, video/youtube",
          },
        },
      ],
      localized: true,
    },
    linkGroup({
      overrides: {
        label: {
          en: "Find out more",
        },
        localized: true,
      },
    }),
    image({
      overrides: {
        name: "foregroundImage",
        required: true,
        admin: {
          description: "Image to display on the right side of the video.",
        },
      },
    }),
    image({
      overrides: {
        name: "backgroundImage",
        required: true,
        admin: {
          description: "Image to display in the background.",
        },
      },
    }),
  ],
};

export default HowItWorks;
