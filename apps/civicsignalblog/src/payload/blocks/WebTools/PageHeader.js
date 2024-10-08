import { slateEditor } from "@payloadcms/richtext-slate";

import richText from "#civicsignalblog/payload/fields/richText";

const PageHeader = {
  slug: "webtools-page-header",
  labels: {
    singular: "Page Header",
    plural: "Page Headers",
  },
  imageURL: "/images/cms/blocks/web_tools_page_header.png",
  imageAltText: "Header for web tools pages",
  fields: [
    {
      name: "title",
      required: true,
      type: "text",
    },
    richText({
      name: "description",
      editor: slateEditor({
        admin: {
          elements: ["link"],
        },
      }),
    }),
  ],
};

export default PageHeader;
