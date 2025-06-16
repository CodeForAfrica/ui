import { richText } from "@commons-ui/payload";

const PageContent = {
  slug: "page-content",
  imageURL: "/images/cms/blocks/page-content.png",
  imageAltText: "Used in page content.",
  fields: [
    richText({
      name: "content",
      required: true,
      admin: {
        description: "A brief description of the slide content.",
      },
    }),
  ],
};

export default PageContent;
