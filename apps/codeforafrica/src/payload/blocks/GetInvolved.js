import impacts from "../fields/impacts";
import linkGroup from "../fields/links/linkGroup";

const GetInvolved = {
  slug: "get-involved",
  imageURL: "/images/cms/blocks/get_involved.jpg",
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
