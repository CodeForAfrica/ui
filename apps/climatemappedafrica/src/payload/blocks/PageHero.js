import LocationSelect, { validateLocation } from "../fields/LocationSelect";
import richText from "../fields/richText";

const PageHero = {
  slug: "page-hero",
  imageURL: "/images/cms/blocks/hero.png",
  imageAltText: "Used in homepage",
  labels: {
    singular: "Hero",
    plural: "Hero",
  },
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
      name: "location",
      label: "Featured Location",
      type: "group",
      fields: [
        {
          name: "name",
          type: "select",
          options: ["-"],
          required: true,
          hasMany: false,
          validate: validateLocation,
          admin: {
            components: {
              Field: LocationSelect,
            },
          },
        },
        {
          name: "center",
          label: "Center Point",
          type: "point",
        },
      ],
    },
    {
      name: "comment",
      type: "text",
      label: "Comment",
    },
  ],
};

export default PageHero;
