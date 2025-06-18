import {
  createdBy,
  nestCollectionUnderPage,
  linkGroup,
} from "@commons-ui/payload";

import BaseContentCollection from "./BaseContentCollection";

const Posts = BaseContentCollection("posts", {
  hasTags: true,
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
        const parentPage = doc?.parentPage?.slug;
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
