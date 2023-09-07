const AboutPageHeader = {
  slug: "about-page-header",
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
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
  ],
};

export default AboutPageHeader;
