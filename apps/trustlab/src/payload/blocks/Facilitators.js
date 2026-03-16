import { richText } from "@commons-ui/payload";

const Facilitators = {
  slug: "facilitators",
  imageURL: "/images/cms/blocks/facilitators.png",
  imageAltText: "Facilitators block.",
  labels: { singular: "Facilitators", plural: "Facilitators" },
  fields: [
    richText({ name: "content", required: true, localized: true }),
    {
      name: "facilitators",
      type: "array",
      label: "Facilitators",
      localized: true,
      fields: [{ name: "name", type: "text", required: true, label: "Name" }],
    },
  ],
};

export default Facilitators;
