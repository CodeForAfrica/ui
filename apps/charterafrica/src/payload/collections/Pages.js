import Ecosystem from "../blocks/Ecosystem";
import Hero from "../blocks/Hero";
import Resources from "../blocks/Resources";
import Spotlight from "../blocks/Spotlight";
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
      name: "blocks",
      type: "blocks",
      blocks: [Hero, Ecosystem, Spotlight, Resources],
    },
  ],
};

export default Pages;
