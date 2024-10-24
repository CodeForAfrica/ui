import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "#civicsignalblog/payload/fields/richText";

const PageHeader = {
  slug: "page-header",
  labels: {
    singular: "Page Header",
    plural: "Page Headers",
  },
  imageURL: "/images/cms/blocks/page_header.jpg",
  imageAltText: "Header for content pages such as contact page.",
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    richText({
      name: "subtitle",
      editor: slateEditor({
        admin: {
          elements: ["link"],
          leaves: ["bold", "italic", "underline"],
        },
      }),
    }),
  ],
};

export default PageHeader;
