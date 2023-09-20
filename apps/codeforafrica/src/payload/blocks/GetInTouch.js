import linkGroup from "../fields/links/linkGroup";

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
      label: "Subtitle",
      required: true,
      type: "text",
    },
    linkGroup({ overrides: { name: "action", label: "Action" } }),
  ],
};

export default GetInTouch;
