import { createdBy, nestCollectionUnderPage } from "@commons-ui/payload";

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
    {
      name: "parentPage",
      type: "relationship",
      relationTo: "pages",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterRead: [
      ({ doc, req }) => {
        const parentPage = doc.parentPage.slug;
        if (!parentPage) {
          return doc;
        }
        const hook = nestCollectionUnderPage(parentPage);
        return hook({ doc, req });
      },
    ],
  },
});

export default Posts;
