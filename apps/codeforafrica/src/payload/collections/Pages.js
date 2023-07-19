import { pages } from "./slugNames";

const Pages = {
  slug: pages,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
  ],
};

export default Pages;
