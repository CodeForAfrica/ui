import { richText } from "@commons-ui/payload";

const Content = {
  slug: "content",
  imageURL: "/images/cms/blocks/content.png",
  imageAltText: "Adds rich text to a page.",
  fields: [
    richText({
      name: "content",
      required: true,
    }),
  ],
};

export default Content;
