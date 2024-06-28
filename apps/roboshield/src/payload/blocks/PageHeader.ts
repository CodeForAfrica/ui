import { Block } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";

export const PageHeader: Block = {
  slug: "page-header",
  labels: {
    singular: "Page Header",
    plural: "Page Header",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: true,
    },
  ],
};
