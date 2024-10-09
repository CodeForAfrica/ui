import richText from "../fields/richText";

const PageHero = {
  slug: "page-hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage",
  labels: {
    singular: "Site Hero",
    plural: "Site Hero",
  },
  interfaceName: "SiteHero",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    richText({
      name: "subtitle",
      required: true,
      label: "Sub Title",
    }),
    {
      name: "searchLabel",
      type: "text",
      label: "Search Label",
      required: true,
    },
    {
      name: "searchPlaceholder",
      type: "text",
      label: "Search Placeholder",
    },
    {
      name: "comment",
      type: "text",
      label: "Comment",
      required: true,
    },
  ],
};

export default PageHero;
