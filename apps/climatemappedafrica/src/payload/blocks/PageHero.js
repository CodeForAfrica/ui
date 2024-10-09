import richText from "../fields/richText";

export const PageHero = {
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
    },
    {
      name: "comment",
      type: "text",
      label: "Comment",
    },
  ],
};

export default PageHero;
