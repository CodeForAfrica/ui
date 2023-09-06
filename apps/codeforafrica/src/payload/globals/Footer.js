import menus from "../fields/menus";
import richText from "../fields/richText";
import socialLinks from "../fields/socialLinks";

const Footer = {
  slug: "footer",
  access: {
    read: () => true,
  },
  label: "Footer",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
      label: "Logo",
    },
    richText({
      name: "description",
      label: "Description",
      required: true,
    }),
    {
      type: "group",
      name: "connect",
      label: "Social Accounts",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          admin: {
            description: () =>
              "Text that appears on contact links e.g Stay in Touch",
          },

          required: true,
        },
        socialLinks({ name: "links" }),
      ],
    },
    menus({ overrides: { name: "menu" } }),
    menus({
      overrides: {
        name: "secondaryMenu",
        label: "Secondary Menu",
      },
    }),
    {
      name: "newsletter",
      type: "group",
      label: "Newsletter",
      fields: [
        {
          name: "title",
          required: true,

          type: "text",
          label: "Title",
        },
        {
          name: "embedCode",
          type: "code",
          label: "Embed Code",
          required: true,
          admin: {
            language: "html",
          },
        },
      ],
    },
    {
      name: "copyright",
      label: "Copyright",
      type: "text",
    },
  ],
};

export default Footer;
