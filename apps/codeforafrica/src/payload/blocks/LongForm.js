import content from "../fields/content";

const LongForm = {
  slug: "longform",
  imageURL: "/images/cms/blocks/longform.jpg",
  imageAltText: "Our team.",
  labels: {
    singular: {
      en: "Long Form",
    },
    plural: {
      en: "Long Form",
    },
  },
  fields: [content({ minRows: 1, required: true, localized: true })],
};

export default LongForm;
