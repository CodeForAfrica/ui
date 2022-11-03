import formatSlug from "../utils/payload/formatSlug";

const Page = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true, // Everyone can read Pages
  },
  fields: [
    {
      name: "title",
      label: "Page Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Page Slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
  ],
};

export default Page;
