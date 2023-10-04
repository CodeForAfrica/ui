import impacts from "../fields/impacts";

const OurImpact = {
  slug: "our-impact",
  imageURL: "/images/cms/blocks/our_impact.jpg",
  imageAltText: "Show our impact.",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    impacts({
      minRows: 1,
    }),
  ],
};

export default OurImpact;
