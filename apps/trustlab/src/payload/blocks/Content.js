import { richText } from "@commons-ui/payload";

const Content = {
  slug: "content",
  imageURL: "/images/cms/blocks/content.png",
  imageAltText: "RichText Used in page content.",
  fields: [
    richText({
      name: "content",
      required: true,
      admin: {
        description: "Ricjh Text content gors here",
      },
    }),
  ],
};

export default Content;
