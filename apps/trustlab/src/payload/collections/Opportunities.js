import BaseContentCollection from "./BaseContentCollection";

const Opportunities = BaseContentCollection("opportunities", {
  hasTags: true,
  fields: [
    {
      name: "deadline",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  labels: {
    singular: {
      en: "Opportunity",
    },
    plural: {
      en: "Opportunities",
    },
  },
});

export default Opportunities;
