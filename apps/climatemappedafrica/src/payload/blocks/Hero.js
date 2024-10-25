import richText from "../fields/richText";

const Hero = {
  slug: "hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage",
  labels: {
    singular: "Hero",
    plural: "Hero",
  },
  fields: [
    richText({
      name: "title",
      required: true,
      label: "Title",
      localized: true,
    }),
    richText({
      name: "subtitle",
      required: true,
      localized: true,
    }),
    {
      name: "searchLabel",
      type: "text",
      label: "Search Label",
      localized: true,
      required: true,
    },
    {
      name: "searchPlaceholder",
      type: "text",
      label: "Search Placeholder",
      localized: true,
    },
    {
      name: "comment",
      type: "text",
      label: "Comment",
      localized: true,
    },
  ],
};

export default Hero;
