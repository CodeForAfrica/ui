import { slateEditor } from "@payloadcms/richtext-slate";

import image from "../../fields/image";
import publishedOn from "../../fields/publishedOn";
import richText from "../../fields/richText";
import slug from "../../fields/slug";
import formatDraftUrl from "../../utils/formatDraftUrl";

const MediaData = {
  slug: "media-data",
  labels: {
    singular: {
      en: "Media Data",
    },
    plural: {
      en: "Media Data",
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "authors", "publishedOn"],
    description: "Stories",
    group: "CivicSignal Tools",
    preview: (doc, options) => formatDraftUrl("posts/stories", doc, options),
    useAsTitle: "title",
    listSearchableFields: ["content", "excerpt"],
    livePreview: {
      // Assumed that all posts appear under posts/stories
      url: ({ data }) => {
        return `${process.env.PAYLOAD_PUBLIC_APP_URL}/posts/stories/${data.slug}`;
      },
    },
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
    slug(),
    richText({
      name: "description",
      editor: slateEditor({
        admin: {
          elements: ["link"],
        },
      }),
    }),
    publishedOn({ localized: true }),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default MediaData;
