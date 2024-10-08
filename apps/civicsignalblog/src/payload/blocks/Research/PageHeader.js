const PageHeader = {
  slug: "page-header",
  imageURL: "/images/cms/blocks/page_header.jpg",
  imageAltText: "Header for content pages such as contact page.",
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    {
      name: "subtitle",
      required: true,
      type: "text",
    },
  ],
};

export default PageHeader;
