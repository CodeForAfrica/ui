import Ecosystem from "../blocks/Ecosystem";
import formatSlug from "../utils/formatSlug";

const Pages = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  access: {
    read: () => true, // Everyone can read Pages
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Layout",
          fields: [
            {
              name: "content",
              type: "blocks",
              blocks: [Ecosystem],
            },
          ],
        },
      ],
    },
  ],
};

export default Pages;
