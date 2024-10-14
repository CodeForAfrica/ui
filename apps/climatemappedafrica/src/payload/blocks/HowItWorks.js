import linkGroup from "../fields/links/linkGroup";

const HowItWorks = {
  slug: "how-it-works",
  imageURL: "/images/cms/blocks/how-it-works.png",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
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
    },
    linkGroup({
      overrides: {
        label: "Link Text",
      },
    }),
  ],
};

export default HowItWorks;
