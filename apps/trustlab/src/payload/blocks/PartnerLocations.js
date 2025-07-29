import { richText } from "@/commons-ui/payload/fields";

import { countries } from "@/trustlab/lib/data/json/countries";

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
      admin: {
        description: "The title of the partner locations block.",
      },
    },
    richText({
      name: "description",
      required: true,
      label: { en: "Description" },
      admin: {
        description: "A brief description of the partner locations.",
      },
    }),
    {
      name: "locations",
      type: "array",
      required: true,
      label: { en: "Locations" },
      fields: [
        {
          name: "locationName",
          type: "text",
          required: true,
        },
        {
          name: "streetAddress",
          type: "text",
          required: true,
        },
        {
          name: "country",
          type: "select",
          required: true,
          options: countries.map((country) => ({
            label: country.name,
            value: country.alpha2,
          })),
        },
        {
          name: "location",
          type: "point",
          label: "Location",
        },
      ],
    },
  ],
};

export default PartnerLocations;
