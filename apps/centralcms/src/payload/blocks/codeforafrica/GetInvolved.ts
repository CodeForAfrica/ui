import impacts from "@/payload/fields/impacts";
import linkGroup from "@/payload/fields/links/linkGroup";
import { Block } from "payload";

const GetInvolved: Block = {
  slug: "get-involved",
  imageURL: "/images/cms/blocks/codeforafrica/get_involved.jpg",
  imageAltText: "Get Involved",
  fields: [
    impacts({
      minRows: 3,
      maxRows: 3,
    }),
    linkGroup({ overrides: { name: "action", label: "Action" } }),
  ],
};

export default GetInvolved;
