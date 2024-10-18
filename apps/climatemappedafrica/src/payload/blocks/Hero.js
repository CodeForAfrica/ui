import LocationSelect, { validateLocation } from "../fields/LocationSelect";
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
      label: "Sub Title",
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
      name: "location",
      label: "Featured Location",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          hasMany: false,
          defaultValue: "af",
          validate: validateLocation,
          localized: true,
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
      localized: true,
    },
  ],
};

export default Hero;
