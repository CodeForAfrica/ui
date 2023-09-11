import image from "../fields/image";

const CustomPageHeader = {
  slug: "custom-page-header",
  imageURL: "/images/cms/blocks/custom_page_header.jpg",
  imageAltText: "Used in about page.",
  fields: [
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      required: true,
      type: "text",
    },
    image({
      overrides: {
        required: true,
      },
    }),
  ],
};

export default CustomPageHeader;
