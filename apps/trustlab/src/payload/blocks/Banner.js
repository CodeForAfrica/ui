import { validateHexColor } from "@commons-ui/payload";

const Banner = {
  slug: "banner",
  imageURL: "/images/cms/blocks/banner.png",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
    },
    {
      type: "upload",
      name: "image",
      relationTo: "media",
    },
    {
      type: "row",
      fields: [
        {
          type: "text",
          name: "backgroundColor",
          defaultValue: "#02041C",
          required: true,
          admin: {
            description: "Background color of the banner in hex format",
          },
          validate: validateHexColor,
        },
        {
          type: "checkbox",
          name: "isPageHeader",
          defaultValue: false,
          label: "Is Page Header",
          admin: {
            style: {
              alignSelf: "center",
            },
          },
        },
      ],
    },
  ],
};

export default Banner;
