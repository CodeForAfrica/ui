import { image, richText } from "@/commons-ui/payload/fields";

const PartnerLocations = {
  slug: "partner-locations",
  imageURL: "/images/cms/blocks/partner-locations.png",
  imageAltText: "Interactive map with title and description.",
  labels: {
    singular: {
      en: "Partner Location",
    },
    plural: {
      en: "Partner Locations",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: { en: "Title" },
      defaultValue: "Where we work",
      localized: true,
      admin: {
        description: "The title of the partner locations block.",
      },
    },
    richText({
      name: "description",
      required: true,
      label: { en: "Description" },
      localized: true,
      admin: {
        description: "A brief description of the partner locations.",
      },
    }),
    image(),
  ],
};

export default PartnerLocations;
