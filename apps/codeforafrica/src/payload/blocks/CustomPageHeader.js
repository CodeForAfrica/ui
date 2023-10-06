import image from "../fields/image";

const CustomPageHeader = {
  slug: "custom-page-header",
  imageURL: "/images/cms/blocks/custom_page_header.jpg",
  imageAltText: "Used in about page.",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default CustomPageHeader;
