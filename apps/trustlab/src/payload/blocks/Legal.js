import { richText } from "@commons-ui/payload";

const Legal = {
  slug: "legal",
  imageURL: "/images/cms/blocks/legal.png",
  imageAltText: "Adds legal page content.",
  fields: [
    richText({
      name: "content",
      required: true,
      localized: true,
    }),
  ],
};

export default Legal;
