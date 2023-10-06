import linkGroup from "../fields/links/linkGroup";

const GetInTouch = {
  slug: "get-in-touch",
  imageURL: "/images/cms/blocks/get_in_touch.jpg",
  imageAltText: "Display Get In Touch Call to Action",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    linkGroup({ overrides: { name: "action", label: "Action" } }),
  ],
};

export default GetInTouch;
