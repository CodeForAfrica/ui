import impacts from "../fields/impacts";

const OurImpact = {
  slug: "our-impact",
  imageURL: "/images/cms/blocks/our_impact.jpg",
  imageAltText: "Show Our Impact",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    impacts({
      minRows: 1,
    }),
  ],
};

export default OurImpact;
