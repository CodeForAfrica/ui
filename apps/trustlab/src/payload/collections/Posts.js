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
      type: "group",
      fields: [
        {
          type: "checkbox",
          name: "isApplication",
          label: "Is Application",
          defaultValue: false,
          required: true,
          admin: {
            description: "Select if this is an application post",
          },
        },
        {
          name: "deadline",
          type: "date",
          admin: {
            position: "sidebar",
            condition: (_, siblingData) => siblingData?.isApplication,
          },
        },
        linkGroup({
          overrides: {
            name: "applicationLink",
            label: "Application Link",
            admin: {
              hideGutter: true,
              condition: (_, siblingData) => siblingData?.isApplication,
            },
          },
        }),
      ],
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
