import impacts from "@/payload/fields/impacts";
import { Block } from "payload";

const OurImpact: Block = {
  slug: "our-impact",
  imageURL: "/images/cms/blocks/codeforafrica/our_impact.jpg",
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
