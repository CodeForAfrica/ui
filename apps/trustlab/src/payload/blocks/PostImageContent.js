import { richText, image } from "@commons-ui/payload";

const PostImageOverview = {
  slug: "post-image-overview",
  imageURL: "/images/cms/blocks/page-overview.png",
  imageAltText: "Page Overview.",
  labels: {
    singular: "Page Overview",
    plural: "Page Overviews",
  },
  fields: [
    richText({
      name: "content",
      required: true,
      localized: true,
      admin: {
        description: "A brief description of the content.",
      },
    }),
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
  ],
};

export default PostImageOverview;
