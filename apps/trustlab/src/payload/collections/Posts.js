import {
  createdBy,
  nestCollectionUnderPage,
  linkGroup,
} from "@commons-ui/payload";
import { createParentField } from "@payloadcms/plugin-nested-docs";

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
    createParentField("pages", {
      required: true,
    }),
  ],
  hooks: {
    afterRead: [
      ({ doc, req }) => {
        const parent = doc?.parent?.slug;
        if (!parent) {
          return doc;
        }
        const hook = nestCollectionUnderPage(parent);
        return hook({ doc, req });
      },
    ],
  },
});

export default Posts;
