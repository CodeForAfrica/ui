import richText from "../fields/richText";

const Error = {
  slug: "error",
  imageURL: "/images/cms/blocks/error.png",
  imageAltText: "Used in Error page.",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    richText({
      name: "subtitle",
      label: "Subtitle",
      admin: {
        elements: ["link"],
      },
    }),
  ],
};

export default Error;
