import link from "../fields/links/link";

const GetInTouch = {
  slug: "get-in-touch",
  imageURL: "/images/cms/blocks/get_in_touch.jpg",
  imageAltText: "Display Get In Touch Call to Action",
  fields: [
    {
      name: "title",
      label: "Title",
      required: true,
      type: "text",
    },
    {
      name: "subtitle",
      label: "Sub Title",
      required: true,
      type: "text",
    },
    {
      name: "action",
      label: "Action Button",
      type: "group",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
        },
        link({}),
      ],
    },
  ],
};

export default GetInTouch;
