import { slateEditor } from "@payloadcms/richtext-slate";

import canRead from "#civicsignalblog/payload/access/applications/main";
import isAdminOrEditor from "#civicsignalblog/payload/access/isAdminOrEditor";
import document from "#civicsignalblog/payload/fields/document";
import image from "#civicsignalblog/payload/fields/image";
import richText from "#civicsignalblog/payload/fields/richText";

const MediaData = {
  slug: "media-data",
  access: {
    read: canRead,
    update: isAdminOrEditor,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ["title", "updatedAt"],
    enableRichTextLink: false,
    group: "Publication",
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    image({
      overrides: {
        name: "mediaDataImage",
        required: true,
        localized: true,
      },
    }),
    document({
      overrides: {
        name: "document",
        required: true,
      },
    }),
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

export default MediaData;
