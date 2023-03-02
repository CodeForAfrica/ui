import ExternalEmbed from "./ExternalEmbed";
import MediaBlock from "./MediaBlock";
import RichText from "./RichText";

const LongForm = {
  slug: "longform",
  labels: {
    singular: {
      en: "Long Form",
      fr: "Forme Longue",
      pt: "Formato Longo",
    },
    plural: {
      en: "Long Form",
      fr: "Forme Longue",
      pt: "Formato Longo",
    },
  },
  fields: [
    {
      name: "content",
      type: "blocks",
      blocks: [RichText, MediaBlock, ExternalEmbed],
      required: true,
    },
  ],
};

export default LongForm;
