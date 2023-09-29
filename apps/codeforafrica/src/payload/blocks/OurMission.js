import richText from "../fields/richText";

const OurMission = {
  slug: "our-mission",
  imageURL: "/images/cms/blocks/our_mission.jpg",
  imageAltText: "Show Mission Statement",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
      required: true,
    },
    richText({
      name: "description",
      label: "Description",
      required: true,
      admin: {
        elements: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "link",
          "ol",
          "ul",
          "indent",
        ],
      },
    }),
  ],
};

export default OurMission;
