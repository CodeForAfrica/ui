import {
  createdBy,
  image,
  nestCollectionUnderPage,
  linkGroup,
  richText,
} from "@commons-ui/payload";

import BaseContentCollection from "./BaseContentCollection";

const Posts = BaseContentCollection("posts", {
  hasTags: false,
  labels: {
    singular: {
      en: "Post",
    },
    plural: {
      en: "Posts",
    },
  },
  fields: [
    {
      name: "deadline",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    linkGroup({
      overrides: {
        name: "applicationLink",
        required: true,
        label: "Application Link",
      },
    }),
    createdBy({
      overrides: {
        name: "author",
        hidden: false,
        required: true,
        admin: {
          readOnly: false,
        },
      },
    }),
    image({
      overrides: {
        name: "image",
        required: true,
      },
    }),
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    richText({
      name: "content",
      localized: true,
    }),
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterRead: [nestCollectionUnderPage("posts")], // TODO:(@kelvinkipruto) Nest this under parent page once it's available
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
});

export default Posts;
