import richText from "../fields/richText";

const HeroTypes = [
  {
    name: "animatedHero",
    label: "Animated Hero",
  },
  {
    name: "staticHero",
    label: "Static Hero",
  },
  {
    name: "imageHero",
    label: "Image Hero",
  },
];

const Hero = {
  slug: "hero",
  fields: [
    {
      name: "type",
      label: "Hero Type",
      type: "select",
      required: true,
      options: HeroTypes.map(({ name, label }) => ({
        value: name,
        label,
      })),
    },
    richText({
      name: "richTitle",
      label: "Title",
      required: true,
      admin: {
        elements: [],
        leaves: ["bold"],
        condition: (_, siblingData) => siblingData?.type === "animatedHero",
      },
    }),
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type !== "animatedHero",
      },
    },
    {
      name: "subtitle",
      label: "Subtitle",
      required: true,
      type: "text",
    },
    {
      name: "messages",
      type: "array",
      label: "Messages",
      minRows: 1,
      fields: [
        {
          name: "message",
          type: "text",
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data.message;
          },
        },
        condition: (_, siblingData) => siblingData?.type === "animatedHero",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === "imageHero" ||
          siblingData?.type === "animatedHero",
      },
    },
  ],
};

export default Hero;
